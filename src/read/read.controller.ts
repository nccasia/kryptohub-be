import {Controller, Get, Logger, Param, Res} from '@nestjs/common';
import {Response} from 'express';
import {Metadata, MetadataFilter} from '../model';
import {IpfsDownloader} from './ipfs-downloader';

@Controller('read')
export class ReadController {
    private readonly logger = new Logger(ReadController.name);

    constructor(private readonly downloader: IpfsDownloader) {}

    @Get(':cid')
    async getData(
        @Res() res: Response,
        @Param('cid') cid: string,
    ): Promise<void> {
        this.logger.log(`trying to read ${cid}`);
        try {
            await this.downloader.download(
                cid,
                res,
                this.headersMetaFilter(res),
            );
        } catch (e) {
            this.logger.error(`could not read ${cid}: `, e);
            throw e;
        }
    }

    private headersMetaFilter(res: Response): MetadataFilter {
        return async (meta: Metadata): Promise<Metadata> => {
            this.logger.log(
                `processing metadata: ${JSON.stringify(meta || {})}`,
            );
            const {filename, contentType} = meta.headers || {
                filename: 'file',
                contentType: 'application/json',
            };
            res.setHeader(
                'Content-Disposition',
                `attachment; filename=${filename}`,
            );
            res.setHeader('Content-Type', contentType);
            return meta;
        };
    }
}
