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
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';

import {AuthUser} from '../user/user.decorator';
import {User} from '../user/user.entity';
import {AuthService} from './auth.service';
import {JWTAuthGuard} from './guards/jwt-auth.guard';
import {SessionAuthGuard} from './guards/session-auth.guard';
import {ApiTags} from '@nestjs/swagger';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {SignInRegistration} from './dto/sign-in-credentials.dto';
import {GithubRegistration} from './dto/github-auth.dto';
import {GoogleAuthDto} from './dto/google-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body(new ValidationPipe()) authCredentialsDto: AuthCredentialsDto,
    ): Promise<User | undefined> {
        const result = await this.authService.register(authCredentialsDto);
        return result;
    }

    @Post('github')
    @HttpCode(HttpStatus.OK)
    async githubAuth(@Body() githubRegistration: GithubRegistration) {
        return this.authService.loginGithub(githubRegistration);
    }

    @Post('google')
    @HttpCode(HttpStatus.OK)
    async googleAuth(@Body() googleAuthDto: GoogleAuthDto) {
        return this.authService.loginGoogle(googleAuthDto);
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

    @Post('/check-email')
    async checkExistEmail(@Body() emailAddress: any) {
        console.log(emailAddress, 'emailAddress');

        return await this.authService.checkExistEmail(
            emailAddress.emailAddress,
        );
    }

    @Post('/check-username')
    async checkExistUsername(@Body() username: any) {
        console.log(username, 'emailAddress');

        return await this.authService.checkExistUsername(username.username);
    }
}
