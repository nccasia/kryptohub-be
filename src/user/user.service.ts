import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, FindOneOptions} from 'typeorm';

import {User} from './user.entity';
import {UserUpdate} from './dto/user-update.dto';
import { AuthProvider, UserGithub } from '../shared';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(data: Partial<User>): Promise<User> {
        return this.userRepository.save(new User(data));
    }

    async createGithub(data: Partial<User>): Promise<User> {
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

    async update(id: number, updates: UserUpdate): Promise<User> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new NotFoundException(`There isn't any user with id: ${id}`);
        }
        Object.assign(user, updates);

        return this.userRepository.save(user);
    }

    async findOrCreate(userId: string, provider: AuthProvider): Promise<UserGithub> {
		// TODO Perform database lookup to extract more information about the user
		// or to create the user if the UserId is unknown to us.
		// For now, we'll skip this and always return the same dummy user, regardless of the `userId`.
		return {
			id: '84052083',
			provider,
			providerId: '123',
			displayName: 'NSHIT99',
			photos: [{ value: 'https://avatars.githubusercontent.com/u/84052083?v=4' }],
		};
	}
}
