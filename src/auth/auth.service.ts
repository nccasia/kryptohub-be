import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {User} from '../user/user.entity';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {UserService} from '../user/user.service';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<User | undefined> {
        const user = new User();
        user.email = authCredentialsDto.email;
        user.username = authCredentialsDto.username;

        const result = await this.userService.any({
            where: {email: user.email, username: user.username},
        });

        if (result == null) {
            user.email = authCredentialsDto.email;
            user.password = authCredentialsDto.password;
            user.username = authCredentialsDto.username;
            return await user.save();
        } else {
            throw new UnauthorizedException('Email or username already exists');
        }
    }

    // async login(email: string, password: string): Promise<User> {
    //     let user: User;

    //     try {
    //         user = await this.userService.findOne({where: {email}});
    //     } catch (err) {
    //         throw new UnauthorizedException(
    //             `There isn't any user with email: ${email}`,
    //         );
    //     }

    //     if (!(await user.checkPassword(password))) {
    //         throw new UnauthorizedException(
    //             `Wrong password for user with email: ${email}`,
    //         );
    //     }
    //     delete user.password;

    //     return user;
    // }

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
}
