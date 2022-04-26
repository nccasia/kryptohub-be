import {IpfsClient} from './ipfs-client';
import {Injectable} from '@nestjs/common';
import {Writable} from 'stream';
import {Metadata, MetadataFilter} from '../database/metadata';

export interface IDownloader {
    download(path: string, writer: Writable): Promise<Metadata | null>;
}

@Injectable()
export class IpfsDownloader implements IDownloader {
    constructor(private readonly ipfs: IpfsClient) {}

    async download(
        id: string,
        writer: Writable,
        ...metadataFilters: MetadataFilter[]
    ): Promise<Metadata | null> {
        let metadata = await this.ipfs.get<Metadata>(id);
        if (metadata) {
            for await (const filter of metadataFilters) {
                metadata = await filter(metadata, id);
            }
            await this.ipfs.getStream(metadata.id, writer);
            return metadata;
        }
        return null;
    }
}
