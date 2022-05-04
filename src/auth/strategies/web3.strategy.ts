import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import { Strategy } from 'passport-web3';

import {AuthService} from '../auth.service';
import {User} from '../../user/user.entity';

@Injectable()
export class Web3Strategy extends PassportStrategy(Strategy, 'web3') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    validate(email: string, password: string): Promise<User> {
        return this.authService.login(email, password);
    }
}
