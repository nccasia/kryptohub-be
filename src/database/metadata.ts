import {FileHeaders} from './file';

export interface Metadata {
    headers?: FileHeaders;
    id: ID;
    path: string;
}

export type ID = string | Buffer;

export const metadataPath = (path: string): string => `.meta-${path}`;

export type MetadataFilter = (
    meta: Metadata,
    ...args: string[]
) => Promise<Metadata>;
