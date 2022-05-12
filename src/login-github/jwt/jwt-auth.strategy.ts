import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfig } from '../config/interfaces';
import { JwtPayload } from '../shared';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService<AppConfig>) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromAuthHeaderAsBearerToken(),
				(request: Request) => request?.cookies?.jwt,
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: JwtPayload) {
		console.log(
			`${JwtAuthStrategy.name}#${this.validate.name}(): payload = ${JSON.stringify(
				payload,
				null,
				4,
			)}`,
		);
		const { displayName } = payload;
		return { displayName };
	}
}
