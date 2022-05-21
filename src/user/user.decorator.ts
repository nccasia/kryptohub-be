import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';

import {User} from './user.entity';

export const AuthUser = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const user = ctx.switchToHttp().getRequest<Request>().user as User;
        console.log(user);
        return data ? user && user[data] : user;
    },
);

export const GetUser = createParamDecorator(
    (_data, ctx: ExecutionContext): User => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    },
);
