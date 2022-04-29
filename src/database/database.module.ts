import { ConfigModule } from '@nestjs/config';
import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database-config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        })
    ]
})
export class DatabaseModule {}
