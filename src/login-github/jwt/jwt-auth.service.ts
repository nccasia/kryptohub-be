import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, UserGithub } from '../shared';

@Injectable()
export class JwtAuthService {
	constructor(private jwtService: JwtService) {}

	login(user: UserGithub) {
		const { id, displayName, photos } = user.user;
		const payload: JwtPayload = {
			sub: id,
			displayName,
		};

		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
