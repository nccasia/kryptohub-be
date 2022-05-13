import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, UserGithub } from '../shared';

@Injectable()
export class JwtAuthService {
	constructor(private jwtService: JwtService) {}

	login(user: UserGithub) {
		const { id, username } = user.user;
		const payload: JwtPayload = {
			sub: id,
			username,
		};

		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
