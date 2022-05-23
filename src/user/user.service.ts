import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, FindOneOptions} from 'typeorm';
import {User} from './user.entity';
import {UserUpdate} from './dto/user-update.dto';
import {AuthService} from '../auth/auth.service';
import {SignInRegistration} from '../auth/dto/sign-in-credentials.dto';
// import {JwtService} from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        // private readonly jwtService: JwtService,
        private readonly userRepository: Repository<User>,
    ) {}

    async create(data: Partial<User>): Promise<User> {
        return this.userRepository.save(new User(data));
    }

    async findOne(where: FindOneOptions<User>): Promise<User> {
        const user = await this.userRepository.findOne(where);

        if (!user) {
            throw new NotFoundException(
                `There isn't any user with identifier: ${where}`,
            );
        }

        return user;
    }

    async any(where: FindOneOptions<User>) {
        const user = await this.userRepository.findOne(where);

        return user;
    }

    // async update(id: number, updates: UserUpdate) {
    //     const user = await this.userRepository.findOne(id);

    //     if (!user) {
    //         throw new NotFoundException(`There isn't any user with id: ${id}`);
    //     }
    //     Object.assign(user, updates);

    //     const password = user.password;
    //     const usernameOrEmail = updates.username;
    //     let signInRegistration: SignInRegistration = {
    //         password,
    //         usernameOrEmail,
    //     };
    //     return {
    //         accessToken: this.authService.loginAccount(signInRegistration),
    //         user: this.userRepository.save(user),
    //     };
    // }
}
