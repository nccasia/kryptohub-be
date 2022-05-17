import {ConfigService, ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {JwtModule, JwtModuleOptions} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {UserModule} from '../user/user.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {SessionSerializer} from './session.serializer';
import {JwtStrategy} from './strategies/jwt.strategy';
import {LocalStrategy} from './strategies/local.strategy';
import {Web3Strategy} from './strategies/web3.strategy';
import {GoogleStrategy} from './google-auth/google.strategy';
import {GoogleController} from './google-auth/google.controller';
import {HttpModule} from '@nestjs/axios';

@Module({
    imports: [
        ConfigModule,
        UserModule,
        HttpModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (
                env: ConfigService,
            ): Promise<JwtModuleOptions> => ({
                secret: env.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1d',
                    algorithm: 'HS384',
                },
                verifyOptions: {
                    algorithms: ['HS384'],
                },
            }),
            inject: [ConfigService],
        }),
        PassportModule.register({defaultStrategy: 'jwt'}),
    ],
    controllers: [AuthController, GoogleController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        Web3Strategy,
        SessionSerializer,
        GoogleStrategy,
    ],
    exports: [PassportModule],
})
export class AuthModule {}
