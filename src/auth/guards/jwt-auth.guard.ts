import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {}
