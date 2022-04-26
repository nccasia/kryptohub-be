import {Injectable} from '@nestjs/common';
import ipfsClient from 'ipfs-http-client';
import {BufferList} from 'bl';
import {once} from 'events';
import {Writable} from 'stream';
import {FileContent, FileHeaders, ID} from '../database';
import * as http from 'http';

const opts = createIpfsConn();
const ipfs = ipfsClient(opts as any);

@Injectable()
export class IpfsClient {
    async add(
        path: string,
        content: FileContent,
        headers?: FileHeaders,
    ): Promise<string> {
        const opts = {trickle: false};
        // if the file is large -> save it with trickle layout
        // trickle is more suitable for large, sequential data
        // default layout of the DAG is balanced, which will be less efficient
        if (headers?.size && headers.size > 10000) {
            opts.trickle = true;
        }
        const {cid} = await ipfs.add(
            {path, content: content as any},
            {trickle: true},
        );
        return cid.toString();
    }

    async get<T>(cid: ID): Promise<T | null> {
        const result = ipfs.get(cid as string) as any;
        if (result) {
            for await (const file of result) {
                if (file.content) {
                    const raw = await getContent(file.content);
                    return <T>JSON.parse(raw);
                }
            }
        }
        return null;
    }

    async getStream(cid: ID, writer: Writable): Promise<void> {
        const result = ipfs.get(cid as string) as any;
        if (result) {
            for await (const file of result) {
                if (file.content) {
                    for await (const chunk of file.content) {
                        if (!writer.write(chunk)) {
                            // handle backpressure
                            await once(writer, 'drain');
                        }
                    }
                }
            }
        }
        writer.end();
    }
}

export const getContent = async (data: Buffer): Promise<string> => {
    const content = new BufferList();
    for await (const chunk of data) {
        content.append(chunk);
    }
    return content.toString();
};

export interface IpfsConnectionOptions {
    protocol?: string;
    host?: string;
    port?: number;
    path?: string;
    agent?: http.Agent;
}

function createIpfsConn(): IpfsConnectionOptions[] | URL {
    if (process.env.IPFS_URL) {
        // http://ipfs:5001/api/v0
        return new URL(process.env.IPFS_URL);
    }
    return [
        {
            protocol: 'http',
            host: 'ipfs',
            port: 5001,
            path: 'api/v0',
        },
        {
            protocol: 'ws',
            host: 'localhost',
            port: 5001,
            path: 'api/v0',
        },
    ];
}

// export type Multihash = any | string;
// export type CID = any;
//
// export type FileContent = Record<string, any> | Blob | string;
//
// export interface IPFSFile {
//   path: string;
//   hash: string;
//   size: number;
//   content?: FileContent;
// }
//
// export interface IPFSGetResult {
//   depth: number;
//   name: string;
//   path: string;
//   size: number;
//   hash: Buffer;
//   content: Buffer;
//   type: 'file' | string;
// }
