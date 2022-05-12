import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {SocialProviderTypes, User} from '../user/user.entity';
import {UserService} from '../user/user.service';
import {SignInRegistration} from './dto/sign-in-registration.dto';
import {SignUpRegistration} from './dto/sign-up-registration.dto';
import {JwtPayload} from './interfaces/jwt-payload.interface';

@Injectable()
export class LoginRegistrationService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async registerAccount(
        signUpRegistration: SignUpRegistration,
    ): Promise<User> {
        const {username, email, password} = signUpRegistration;

        const createUser = await this.userService.create({
            username: username,
            password: password,
            provider: SocialProviderTypes.USERNAME,
            email: email,
        });
        return createUser;
    }

    async loginAccount(signInRegistration: SignInRegistration) {
        let user: User;
        const username = signInRegistration.username;
        const password = signInRegistration.password;
        const confirmPassword = signInRegistration.confirmPassword;
        try {
            user = await this.userService.findOne({where: {username}});
        } catch (err) {
            throw new UnauthorizedException(
                `There isn't any user with username: ${username}`,
            );
        }

        if (!(await user.checkPassword(password as string))) {
            throw new UnauthorizedException(
                `Wrong password for user with username: ${username}`,
            );
        }

        if (!(password === confirmPassword)) {
            throw new UnauthorizedException(
                `Wrong confirm password for user with username: ${username}`,
            );
        }
        delete user.password;
        const payload = {username: user.username, sub: user.id};
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}

