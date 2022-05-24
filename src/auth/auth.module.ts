import {ConfigService, ConfigModule} from '@nestjs/config';
import {forwardRef, Module} from '@nestjs/common';
import {JwtModule, JwtModuleOptions} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {UserModule} from '../user/user.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {SessionSerializer} from './session.serializer';
import {JwtStrategy} from './strategies/jwt.strategy';
import {LocalStrategy} from './strategies/local.strategy';
import {Web3Strategy} from './strategies/web3.strategy';
import {HttpModule} from '@nestjs/axios';
import {JWTAuthGuard} from './guards/jwt-auth.guard';

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
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        Web3Strategy,
        SessionSerializer,
    ],
    exports: [PassportModule],
})
export class AuthModule {}
