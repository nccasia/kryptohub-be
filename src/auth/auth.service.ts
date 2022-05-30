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
        const user = new User();
        user.emailAddress = authCredentialsDto.emailAddress;
        user.username = authCredentialsDto.username;
        user.password = authCredentialsDto.password;

        const result = await this.userService.any({
            where: [{emailAddress: user.emailAddress, username: user.username}],
        });

        if (!user.emailAddress && user.emailAddress == '') {
            throw new UnauthorizedException('Email should not be empty');
        }

        if (!user.username && user.username == '') {
            throw new UnauthorizedException('User name should not be empty');
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
            user.emailAddress = authCredentialsDto.emailAddress;
            user.password = authCredentialsDto.password;
            user.username = authCredentialsDto.username;
            user.status = 'isNew';
            const saveUser = await user.save();
            delete user.password;
            return saveUser;
        } else {
            throw new UnauthorizedException('Email or username already exists');
        }
    }

    async checkExistEmail(emailAddress: any) {
        const result = await this.userService.any({
            where: [{emailAddress: emailAddress}],
        });

        if (result != null) {
            return {message: 'This email already exists'};
        }
    }

    async checkExistUsername(username: any) {
        const result = await this.userService.any({
            where: [{username: username}],
        });

        if (result != null) {
            return {message: 'This user name already exists'};
        }
    }

    async loginAccount(signInRegistration: SignInRegistration) {
        let user: User;
        const usernameOrEmail = signInRegistration.usernameOrEmail;
        const password = signInRegistration.password;

        try {
            user = await this.userService.findOne({
                where: [
                    {username: usernameOrEmail},
                    {emailAddress: usernameOrEmail},
                ],
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
        const payload = {username: user.username, sub: user.emailAddress};
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

            const payload = {
                username: user.username,
                sub: user.githubAddress,
            };

            return {
                accessToken: this.jwtService.sign(payload),
            };
        } catch (e) {
            const user = await this.userService.create({
                username: username,
                profileLink: userGithub.html_url,
                githubAddress: githubRegistration.githubAddress,
                status: 'isNew',
            });

            delete user.password;
            const payload = {
                username: user.username,
                sub: user.githubAddress,
            };

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
                where: {username: payload.username},
            });
        } catch (error) {
            throw new UnauthorizedException(
                `There isn't any user with username: ${payload.username}`,
            );
        }
        delete user.password;

        return user;
    }

    signToken(user: User): string {
        const payload = {
            sub: user.emailAddress,
        };

        return this.jwtService.sign(payload);
    }

    async loginGoogle(googleAuthDto: GoogleAuthDto) {
        if (googleAuthDto.accessToken) {
            const decoded: GoogleAuthReq = jwt_decode(
                googleAuthDto.accessToken,
            );

            try {
                const userExisted = await this.userService.findOne({
                    where: {googleAddress: decoded.email},
                });
                const payload = {
                    googleAddress: userExisted.googleAddress,
                    username: userExisted.username,
                };
                return {accessToken: this.jwtService.sign(payload)};
            } catch (e) {
                const user = await this.userService.create({
                    googleAddress: decoded.email,
                    username: decoded.name,
                    status: 'isNew',
                });
                delete user.password;
                const payload = {
                    googleAddress: decoded.email,
                    username: decoded.name,
                };
                return {accessToken: this.jwtService.sign(payload)};
            }
        }
    }
}
