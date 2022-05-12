import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import {JwtAuthService} from './jwt/jwt-auth.service';
import {GithubOauthGuard} from './guards/login-github.guards';
import {UserService} from '../user/user.service';
import {SocialProviderTypes} from '../user/user.entity';
import {UserGithub} from './shared';
import {Request, Response} from 'express';
import {LoginGithubService} from './login-github.service';
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from 'rxjs';

@Controller('login-github')
export class LoginGithubController {
    constructor(
        private readonly jwtAuthService: JwtAuthService,
        private readonly userService: UserService,
        private readonly http: HttpService,
    ) {}

    @Get()
    @UseGuards(GithubOauthGuard)
    async githubAuth() {}

    @Get('callback')
    @UseGuards(GithubOauthGuard)
    async githubAuthCallback(
        @Req() req: Request,
        @Res({passthrough: true}) res: Response,
    ) {
        const user = req.user as UserGithub;
        const getUser = await firstValueFrom(
            this.http
                .get('https://api.github.com/user', {
                    headers: {Authorization: `Bearer ${user.accessToken}`},
                })
                .pipe((res) => res),
        );

        const userGithub = getUser.data;
        const username = user.user.username;
        try {
            await this.userService.findOne({
                where: {username},
            });

            const {accessToken} = this.jwtAuthService.login(user);
            res.cookie('jwt', accessToken);
            return {access_token: accessToken};
        } catch (e) {
            await this.userService.create({
                username: username,
                password: username,
                provider: SocialProviderTypes.GITHUB,
                email: username,
            });
            const {accessToken} = this.jwtAuthService.login(user);
            res.cookie('jwt', accessToken);
            return {access_token: accessToken};
        }
    }
}
