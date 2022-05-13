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
import { SignInRegistration } from './dto/sign-in-credentials.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly http: HttpService,
        private readonly jwtAuthService: JwtAuthService,
        private readonly userService: UserService,
    ) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(TokenInterceptor)
    async register(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<User | undefined> {
        const result = await this.authService.register(authCredentialsDto);
        return result;
    }

    @Get('/github')
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

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() signInRegistration: SignInRegistration) {
        return this.authService.loginAccount(signInRegistration);
    }

    @Post('web3')
    @UseGuards(Web3AuthGuard)
    @HttpCode(HttpStatus.OK)
    async loginWeb3(@AuthUser() user: User): Promise<User> {
        return user;
    }

    @Get('data')
    @HttpCode(HttpStatus.OK)
    async getData(@Query() query: GetAuthDataQueryDTO): Promise<User> {
        return this.authService.getAuthData({walletAddress: query.address});
    }

    @Get('/me')
    @UseGuards(SessionAuthGuard, JWTAuthGuard)
    me(@AuthUser() user: User): User {
        return user;
    }
}
