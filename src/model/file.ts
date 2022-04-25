export interface FileHeaders {
    filename: string;
    contentType: string;
    size?: number;
}

export type FileContent =
    | Uint8Array
    | Blob
    | string
    | Iterable<Uint8Array>
    | Iterable<number>
    | AsyncIterable<Uint8Array>
    | ReadableStream<Uint8Array>;
