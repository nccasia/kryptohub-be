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
import {Repository} from 'typeorm';

@Controller('login-github')
export class LoginGithubController {
    constructor(
        private readonly jwtAuthService: JwtAuthService,
        private readonly userService: UserService,
    ) {}

    @Get()
    @UseGuards(GithubOauthGuard)
    async githubAuth() {}

    @Get('callback')
    @UseGuards(GithubOauthGuard)
    async githubAuthCallback(@Req() req) {
        const username = req.user.user.username;
        console.log(req);
        console.log(req.user);
        try {
            const findUser = await this.userService.findOne({
                where: {username},
            });

            return {data: req.user, statusCode: HttpStatus.OK};
        } catch (e) {
            await this.userService.createGithub({
                username: username,
                name: req.user.user.displayName,
                email: req.user.user.displayName,
                walletAddress: username,
            });
            return {data: req.user, statusCode: HttpStatus.OK};
        }
    }
}

