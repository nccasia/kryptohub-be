import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {JwtPayload, UserGithub, UserGoogleReq} from '../shared';

@Injectable()
export class JwtAuthService {
    constructor(private jwtService: JwtService) {}

    login(user: UserGithub) {
        const {id, username} = user.user;
        const payload: JwtPayload = {
            sub: id,
            username,
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    loginGooge(user: UserGoogleReq) {
        const email = user.email;
        const payload: JwtPayload = {
            username: email,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
