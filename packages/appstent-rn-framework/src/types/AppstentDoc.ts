export interface AppstentDoc {
    id: string;
    name: string;
    lastModified?: Date;
    content?: string;
    isFolder: boolean;
    children?: AppstentDoc[];
}

export function createAppstentDoc(name: string, lastModified?: Date, isFolder: boolean = false): AppstentDoc {
    return {
        id: crypto.randomUUID(),
        name,
        lastModified,
        isFolder,
        content: '',
        children: isFolder ? [] : undefined
    };
}