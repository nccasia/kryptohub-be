import {IsEtherAddress} from './constraints/is-ether-address';
import {IsEmailAvailable} from './constraints/is-email-available.validator';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {ProfileController} from './profile.controller';
import {UserService} from './user.service';
import {Profile} from './profile.entity';
import {IsUsernameAvailable} from './constraints/is-username-available.validator';
import {Repository} from 'typeorm';
import {JwtModule, JwtModuleOptions} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {SkillModule} from '../skills/skills.module';
import { UserController } from './user.controller';
import { TeamModule } from '@/team/team.module';

@Module({
    imports: [
        SkillModule,
        TeamModule,
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
    controllers: [ProfileController, UserController],
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
