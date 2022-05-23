import { IsEtherAddress } from './constraints/is-ether-address';
import { IsEmailAvailable } from './constraints/is-email-available.validator';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {User} from './user.entity';
import {ProfileController} from './profile.controller';
import {UserService} from './user.service';
import {Profile} from './profile.entity';
import { IsUsernameAvailable } from './constraints/is-username-available.validator';

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile])],
    controllers: [ProfileController],
    providers: [UserService, IsEmailAvailable, IsEtherAddress, IsUsernameAvailable],
    exports: [UserService],
})
export class UserModule {}
