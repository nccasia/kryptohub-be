import {Injectable} from '@nestjs/common';
import {USERNAME_TAKEN} from './error.codes';
import {Model} from 'mongoose';
import {ApplicationError} from '@hovoh/nestjs-application-error';
import {EthereumAddress} from '../utils/EthereumAddress';
import {ETHEREUM_ADDRESS_ALREADY_IN_USE} from '../authentication/error.codes';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from './user.schema';

@Injectable()
export class UsersService {
    constructor(private usersRepository: Model<UserDocument>) {}

    async registerUser(
        address: EthereumAddress,
        username?: string,
        password?: string,
    ): Promise<User> {
        let user = new User();
        user.username = username;
        user.password = password;
        user.ethereumAddress = address;
        try {
            const insertResult = await this.usersRepository.create(user);
            user = Object.assign(user, insertResult.toJSON());
        } catch (sqlError) {
            const userAccount = await this.findByEthAddress(address);
            if (userAccount) {
                throw new ApplicationError(ETHEREUM_ADDRESS_ALREADY_IN_USE);
            } else {
                throw new ApplicationError(USERNAME_TAKEN);
            }
        }
        return user;
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOne({username});
    }

    async findByEthAddress(address: string): Promise<User | null> {
        return this.usersRepository.findOne({ethereumAddress: address});
    }

    async findByUuid(uuid: string): Promise<User | null> {
        return this.usersRepository.findOne({uuid});
    }

    async findOne(user: Partial<User>) {
        return this.usersRepository.findOne(user);
    }

    async findAll(user: Partial<User> = {}) {
        return this.usersRepository.find(user);
    }

    async update(user: User, update: Partial<User>) {
        await this.usersRepository.updateOne(user, update).exec();
        return user;
    }

    async updateFromUuid(uuid: string, update: Partial<User>) {
        return await this.usersRepository.update({uuid}, update);
    }

    async walletIsRegistered(address: EthereumAddress) {
        return !!(await this.findByEthAddress(address));
    }

    merge(user0: User, user1: Partial<User>) {
        return this.usersRepository.update(user0, user1);
    }
}
