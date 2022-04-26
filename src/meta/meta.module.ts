import {UploadModule} from './upload/upload.module';
import {ReadModule} from './read/read.module';
import {Module} from '@nestjs/common';

@Module({
    imports: [UploadModule, ReadModule],
})
export class MetaModule {}
