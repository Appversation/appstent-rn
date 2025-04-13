import { CacheStatus, ViewContentConfig, ViewDescriptor } from "./types/ViewContent";

import { ViewContentCache } from "./cache/ViewContentCache";

export class ViewContent {
    private static config: ViewContentConfig;
    private viewDescriptor: ViewDescriptor;
    private cache: ViewContentCache;
    private static basePath: string;

    public isLoaded: boolean = false;
    public cacheStatus: CacheStatus = CacheStatus.NONE;

    static configure(config: ViewContentConfig): void {
        this.config = config;
        this.basePath = config.basePath || 
            `https://9ikqzu1k56.execute-api.us-east-2.amazonaws.com/${config.deploymentStage}/content/`;
    }

    constructor(contentId: string) {
        this.viewDescriptor = {};
        this.cache = ViewContentCache.getInstance();
        this.loadContent(contentId);
    }


    public get type(): string {
        return this.viewDescriptor.type || '';
    }

    private async loadContent(contentId: string): Promise<void> {
        // Try to load from cache first
        const cachedData = await this.cache.retrieve(contentId);
        if (cachedData) {
            try {
                this.viewDescriptor = JSON.parse(cachedData);
                this.isLoaded = true;
                this.cacheStatus = CacheStatus.CACHED;
            } catch (error) {
                console.error('Error parsing cached data:', error);
            }
        }

        // Always try to update from remote
        this.updateFromRemote(contentId);
    }

    private async updateFromRemote(contentId: string): Promise<void> {
        if (!ViewContent.config?.apiKey) {
            throw new Error('ViewContent not configured. Call ViewContent.configure() first.');
        }

        try {
            this.cacheStatus = CacheStatus.UPDATING;
            const response = await fetch(`${ViewContent.basePath}${contentId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': ViewContent.config.apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const jsonString = JSON.stringify(data);
            
            // Only update and store if content has changed
            if (jsonString !== JSON.stringify(this.viewDescriptor)) {
                await this.cache.store(contentId, jsonString);
                this.viewDescriptor = data;
            }
            
            this.cacheStatus = CacheStatus.UP_TO_DATE;
        } catch (error) {
            console.error('Error loading remote content:', error);
            this.cacheStatus = CacheStatus.ERROR;
        }

        this.isLoaded = true;
    }

    get<T>(key: string): T | undefined {
        const iosKey = `ios:${key}`;
        return (this.viewDescriptor[iosKey] ?? this.viewDescriptor[key]) as T;
    }

    static clearCache(): void {
        ViewContentCache.getInstance().clear();
    }
}