import { ConfigService, ConfigModule } from '@nestjs/config';
import {Module} from '@nestjs/common';
import {JwtModule, JwtModuleOptions} from '@nestjs/jwt';
import {PassportModule, PassportStrategy} from '@nestjs/passport';

import {UserModule} from '../user/user.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {SessionSerializer} from './session.serializer';
import {JwtStrategy} from './strategies/jwt.strategy';
import {LocalStrategy} from './strategies/local.strategy';
import { Web3Strategy } from './strategies/web3.strategy';

@Module({
    imports: [
        ConfigModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (env: ConfigService): Promise<JwtModuleOptions> => ({
                secret: env.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1d',
                    algorithm: 'HS384',
                },
                verifyOptions: {
                    algorithms: ['HS384'],
                },
            }),
            inject: [ConfigService]
        }),
        PassportModule.register({defaultStrategy: 'web3'}),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, Web3Strategy, SessionSerializer],
    exports: [PassportModule]
})
export class AuthModule {}
