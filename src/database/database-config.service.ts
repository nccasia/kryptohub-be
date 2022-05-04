import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import {getConnectionOptions} from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const opts = await getConnectionOptions();
        return {
            ...opts,
            autoLoadEntities: true,
            synchronize: false,
        };
    }
}
