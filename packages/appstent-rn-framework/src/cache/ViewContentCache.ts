import AsyncStorage from "@react-native-async-storage/async-storage";

interface CacheEntry {
    data: string;
    timestamp: number;
}

export class ViewContentCache {
    private static instance: ViewContentCache;
    private memoryCache: Map<string, CacheEntry> = new Map();
    private readonly memoryCacheExpirationInterval: number = 300000; // 5 minutes

    private constructor() {}

    static getInstance(): ViewContentCache {
        if (!ViewContentCache.instance) {
            ViewContentCache.instance = new ViewContentCache();
        }
        return ViewContentCache.instance;
    }

    async store(key: string, data: string): Promise<void> {
        this.memoryCache.set(key, {
            data,
            timestamp: Date.now()
        });

        try {
            await AsyncStorage.setItem(`@ViewContent:${key}`, data);
        } catch (error) {
            console.error('Error storing data:', error);
        }
    }

    async retrieve(key: string): Promise<string | null> {
        const memoryEntry = this.memoryCache.get(key);
        if (memoryEntry && !this.isExpired(memoryEntry)) {
            return memoryEntry.data;
        }

        try {
            const data = await AsyncStorage.getItem(`@ViewContent:${key}`);
            if (data) {
                this.memoryCache.set(key, {
                    data,
                    timestamp: Date.now()
                });
                return data;
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }

        return null;
    }

    private isExpired(entry: CacheEntry): boolean {
        return Date.now() - entry.timestamp > this.memoryCacheExpirationInterval;
    }

    async clear(): Promise<void> {
        this.memoryCache.clear();
        try {
            const keys = await AsyncStorage.getAllKeys();
            const viewContentKeys = keys.filter(key => key.startsWith('@ViewContent:'));
            await AsyncStorage.multiRemove(viewContentKeys);
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    }
}