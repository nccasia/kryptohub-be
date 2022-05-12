import {GetAuthDataQueryDTO} from './dto/get-auth-data-query.dto';
import {Web3AuthGuard} from './guards/web3-auth.guard';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';

import {AuthUser} from '../user/user.decorator';
import {SocialProviderTypes, User} from '../user/user.entity';
import {AuthService} from './auth.service';
import {JWTAuthGuard} from './guards/jwt-auth.guard';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {SessionAuthGuard} from './guards/session-auth.guard';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {ApiTags} from '@nestjs/swagger';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {UserService} from '../user/user.service';
import {AuthGuard} from '@nestjs/passport';
import {GithubOauthGuard} from './guards/githubAuth.guards';
import {UserGithub} from './githubAuth/shared';
import {HttpService} from '@nestjs/axios';
import {JwtAuthService} from './githubAuth/jwt/jwt-auth.service';
import {firstValueFrom} from 'rxjs';
import {Request, Response} from 'express';

@ApiTags('Auth')
@Controller('')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly http: HttpService,
        private readonly jwtAuthService: JwtAuthService,
        private readonly userService: UserService,
    ) {}

    @Post('auth/register')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(TokenInterceptor)
    async register(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<User | undefined> {
        const result = await this.authService.register(authCredentialsDto);
        return result;
    }

    @Get('/login-github/callback')
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
                provider: SocialProviderTypes.GITHUB,
                email: userGithub.email,
            });
            const {accessToken} = this.jwtAuthService.login(user);
            res.cookie('jwt', accessToken);
            return {access_token: accessToken};
        }
    }

    @Post('auth/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TokenInterceptor)
    async login(@AuthUser() user: User): Promise<User> {
        return user;
    }

    @Post('auth/web3')
    @UseGuards(Web3AuthGuard)
    @HttpCode(HttpStatus.OK)
    async loginWeb3(@AuthUser() user: User): Promise<User> {
        return user;
    }

    @Get('auth/data')
    @HttpCode(HttpStatus.OK)
    async getData(@Query() query: GetAuthDataQueryDTO): Promise<User> {
        return this.authService.getAuthData({walletAddress: query.address});
    }

    @Get('auth/me')
    @UseGuards(SessionAuthGuard, JWTAuthGuard)
    me(@AuthUser() user: User): User {
        return user;
    }

    @Get('auth/')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req): Promise<any> {
        return HttpStatus.OK;
    }

    @Get('auth/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        const provider = req.user.provider;
        const displayName = req.user.displayName;
        const firstName = req.user.firstName;
        const lastName = req.user.lastName;
        const email = req.user.email;
        try {
            await this.userService.findOne({
                where: {
                    email,
                    provider,
                    firstName,
                    lastName,
                    displayName,
                },
            });
            return {data: req.user, statusCode: HttpStatus.OK};
        } catch (error) {
            await this.userService.create({
                email: email,
                username: email,
                firstName: firstName,
                lastName: lastName,
                displayName: displayName,
                provider: SocialProviderTypes.GOOGLE,
                password: 'google',
                walletAddress: email,
            });
            return {data: req.user, statusCode: HttpStatus.OK};
        }
    }
}
