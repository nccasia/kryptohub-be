import {IpfsClient} from '../ipfs/ipfs-client';
import {Injectable} from '@nestjs/common';
import {Metadata, MetadataFilter, metadataPath} from '../model/metadata';
import {FileContent} from '../model/file';

export interface IUploader {
    upload(
        metadata: Metadata,
        content: FileContent,
        ...metadataFilters: MetadataFilter[]
    ): Promise<string>;
}

@Injectable()
export class IpfsUploader implements IUploader {
    constructor(private readonly ipfs: IpfsClient) {}

    // upload the given content stream/buffer
    // metadata will be processed after the content was added to storage
    async upload(
        metadata: Metadata,
        content: FileContent,
        ...metadataFilters: MetadataFilter[]
    ): Promise<string> {
        const id = await this.ipfs.add(
            metadata.path,
            content,
            metadata.headers,
        );
        for await (const filter of metadataFilters) {
            metadata = await filter(metadata, id);
        }
        return await this.ipfs.add(
            metadataPath(metadata.path),
            JSON.stringify(metadata),
        );
    }
}
