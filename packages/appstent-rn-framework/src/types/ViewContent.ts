import { ViewContentCache } from '../cache/ViewContentCache';

export interface ViewDescriptor {
    type?: string;
    title?: string;
    tapHandlerData?: any;
    [key: string]: any;
}

export enum CacheStatus {
    NONE = 'none',
    CACHED = 'cached',
    UPDATING = 'updating',
    UP_TO_DATE = 'upToDate',
    ERROR = 'error'
}

export interface ViewContentConfig {
    deploymentStage: string;
    apiKey: string;
    basePath?: string;
}

