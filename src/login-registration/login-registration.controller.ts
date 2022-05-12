import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {User} from '../user/user.entity';
import {SignInRegistration} from './dto/sign-in-registration.dto';
import {SignUpRegistration} from './dto/sign-up-registration.dto';
import {LoginRegistrationService} from './login-registration.service';

@Controller('login-registration')
export class LoginRegistrationController {
    constructor(
        private readonly loginRegistrationService: LoginRegistrationService,
    ) {}

    @Post('register-registration')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() signUpRegistration: SignUpRegistration): Promise<User> {
        return this.loginRegistrationService.registerAccount(
            signUpRegistration,
        );
    }

    @Post('login-registration')
    @HttpCode(HttpStatus.OK)
    async login(@Body() signInRegistration: SignInRegistration) {
        return this.loginRegistrationService.loginAccount(signInRegistration);
    }
}

