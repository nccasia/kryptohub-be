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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
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

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TokenInterceptor)
    async login(@AuthUser() user: User): Promise<User> {
        return user;
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

    @Get('')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req): Promise<any> {
        return HttpStatus.OK;
    }

    @Get('redirect')
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
