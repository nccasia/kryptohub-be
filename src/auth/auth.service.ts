import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {SocialProviderTypes, User} from '../user/user.entity';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {UserService} from '../user/user.service';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {SignInRegistration} from './dto/sign-in-credentials.dto';
import {GoogleAuthDto, GoogleAuthReq} from './dto/google-auth.dto';
import jwt_decode from 'jwt-decode';

import {GithubRegistration} from './dto/github-auth.dto';
import {firstValueFrom} from 'rxjs';
import {HttpService} from '@nestjs/axios';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly http: HttpService,
        private readonly jwtService: JwtService,
    ) {}

    async register(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<User | undefined> {
        try {
            const user = new User();
            user.email = authCredentialsDto.email;
            user.username = authCredentialsDto.username;
            user.password = authCredentialsDto.password;

            const result = await this.userService.any({
                where: {email: user.email, username: user.username},
            });

            if (!user.email && user.email == '') {
                throw new UnauthorizedException('Email should not be empty');
            }

            if (!user.username && user.username == '') {
                throw new UnauthorizedException(
                    'User name should not be empty',
                );
            }

            const checkLength = (authCredentialsDto.password as string).length;
            if (checkLength <= 8) {
                throw new UnauthorizedException(
                    `Password must contain at least 8 characters`,
                );
            }

            if (
                !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
                    authCredentialsDto.password as string,
                )
            ) {
                throw new UnauthorizedException(
                    `Password must includes lowercase, uppercase, number and special character`,
                );
            }

            if (user.password !== authCredentialsDto.confirmPassword) {
                throw new UnauthorizedException(`Password does not match`);
            }

            if (result == null) {
                user.email = authCredentialsDto.email;
                user.password = authCredentialsDto.password;
                user.username = authCredentialsDto.username;
                const saveUser = await user.save();
                delete user.password;
                return saveUser;
            } else {
                throw new UnauthorizedException(
                    'Email or username already exists',
                );
            }
        } catch (error) {}
    }

    async loginAccount(signInRegistration: SignInRegistration) {
        let user: User;
        const usernameOrEmail = signInRegistration.usernameOrEmail;
        const password = signInRegistration.password;

        try {
            user = await this.userService.findOne({
                where: [{username: usernameOrEmail}, {email: usernameOrEmail}],
            });
        } catch (err) {
            throw new UnauthorizedException(
                `There isn't any user with usernameOrEmail: ${usernameOrEmail}`,
            );
        }

        if (!password && password === '') {
            throw new UnauthorizedException(`password should not be empty`);
        }

        if (!(await user.checkPassword(password as string))) {
            throw new UnauthorizedException(
                `Wrong password for user with username: ${usernameOrEmail}`,
            );
        }

        delete user.password;
        const payload = {username: user.username, sub: user.id};
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async loginGithub(githubRegistration: GithubRegistration) {
        const getUser = await firstValueFrom(
            this.http
                .get('https://api.github.com/user', {
                    headers: {
                        Authorization: `Bearer ${githubRegistration.accessToken}`,
                    },
                })
                .pipe((res) => res),
        );
        const userGithub = getUser.data;
        const username = userGithub.login;
        try {
            const user = await this.userService.findOne({
                where: {username},
            });
            const payload = {username: user.username, sub: user.email};
            return {
                accessToken: this.jwtService.sign(payload),
            };
        } catch (e) {
            const user = await this.userService.create({
                username: username,
                provider: SocialProviderTypes.GITHUB,
                email: githubRegistration.email,
            });

            delete user.password;

            const payload = {username: user.username, sub: user.email};
            return {
                accessToken: this.jwtService.sign(payload),
            };
        }
    }

    async loginWeb3(walletAddress: string): Promise<User> {
        let user: User;

        try {
            user = await this.userService.findOne({where: {walletAddress}});
        } catch (err) {
            throw new UnauthorizedException(
                `There isn't any user with wallet: ${walletAddress}`,
            );
        }

        delete user.password;

        return user;
    }

    async getAuthData({walletAddress}) {
        let user: User;

        try {
            user = await this.userService.findOne({where: {walletAddress}});
        } catch (err) {
            throw new NotFoundException(
                `There isn't any user with wallet: ${walletAddress}`,
            );
        }

        delete user.password;

        return user;
    }

    async verifyPayload(payload: JwtPayload): Promise<User> {
        let user: User;

        try {
            user = await this.userService.findOne({
                where: {email: payload.sub},
            });
        } catch (error) {
            throw new UnauthorizedException(
                `There isn't any user with email: ${payload.sub}`,
            );
        }
        delete user.password;

        return user;
    }

    signToken(user: User): string {
        const payload = {
            sub: user.email,
        };

        return this.jwtService.sign(payload);
    }

    async loginGoogle(googleAuthDto: GoogleAuthDto) {
        if (googleAuthDto.accessToken) {
            const decoded: GoogleAuthReq = jwt_decode(
                googleAuthDto.accessToken,
            );

            const user = await this.userService.create({
                email: decoded.email,
                username: decoded.name,
                firstName: decoded.family_name,
                lastName: decoded.given_name,
                displayName: decoded.name,
                provider: SocialProviderTypes.GOOGLE,
            });
            delete user.password;
            const payload = {email: decoded.email, name: decoded.name};
            return {
                accessToken: this.jwtService.sign(payload),
            };
        }
    }
}
