import {IsEtherAddress} from './constraints/is-ether-address';
import {IsEmailAvailable} from './constraints/is-email-available.validator';
import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {User} from './user.entity';
import {ProfileController} from './profile.controller';
import {UserService} from './user.service';
import {Profile} from './profile.entity';
import {IsUsernameAvailable} from './constraints/is-username-available.validator';
import {AuthModule} from '../auth/auth.module';
import {Repository} from 'typeorm';
import {JwtStrategy} from '../auth/strategies/jwt.strategy';
import {JwtModule, JwtModuleOptions} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {SkillModule} from '../skills/skills.module';

@Module({
    imports: [
        SkillModule,
        TypeOrmModule.forFeature([User, Profile]),
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
    ],
    controllers: [ProfileController],
    providers: [
        UserService,
        IsEmailAvailable,
        IsEtherAddress,
        IsUsernameAvailable,
        Repository,
    ],
    exports: [UserService],
})
export class UserModule {}
