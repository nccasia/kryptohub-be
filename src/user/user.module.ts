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

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    controllers: [ProfileController],
    providers: [
        UserService,
        IsEmailAvailable,
        IsEtherAddress,
        IsUsernameAvailable,
    ],
    exports: [UserService],
})
export class UserModule {}
