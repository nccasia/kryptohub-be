import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';

import {AppConfig} from '../config/interfaces';
import {JwtAuthService} from './jwt-auth.service';
import {JwtAuthStrategy} from './jwt-auth.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService<AppConfig>) => ({
                secret: process.env.JWT_SECRET,
                signOptions: {expiresIn: '60d'},
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtAuthStrategy, JwtAuthService],
    exports: [JwtAuthService],
})
export class JwtAuthModule {}
