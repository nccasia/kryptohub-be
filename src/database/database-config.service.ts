import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const dbHost = this.configService.get('DB_HOST');
        const dbPort = this.configService.get('DB_PORT');
        const dbUser = this.configService.get('DB_USER');
        const dbPassword = this.configService.get('DB_PASSWORD');
        const dbName = this.configService.get('DB_NAME');

        return {
            type: 'postgres',
            port: dbPort,
            host: dbHost,
            username: dbUser,
            password: dbPassword,
            database: dbName,
            synchronize: true,
        };
    }
}
