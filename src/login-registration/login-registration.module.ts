import {Module} from '@nestjs/common';
import {LoginRegistrationService} from './login-registration.service';
import {LoginRegistrationController} from './login-registration.controller';
import {UserModule} from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ConfigModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (
                env: ConfigService,
            ): Promise<JwtModuleOptions> => ({
                secret: env.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: '60d',
                    algorithm: 'HS384',
                },
                verifyOptions: {
                    algorithms: ['HS384'],
                },
            }),
            inject: [ConfigService],
        }),
        PassportModule.register({defaultStrategy: 'web3'}),
    ],
    controllers: [LoginRegistrationController],
    providers: [LoginRegistrationService],
})
export class LoginRegistrationModule {}

