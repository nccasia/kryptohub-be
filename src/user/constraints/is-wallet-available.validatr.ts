import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {Repository} from 'typeorm';
import {isNullOrUndefined} from 'util';

import {User} from '../user.entity';

@ValidatorConstraint({name: 'isUserAlreadyExist', async: true})
@Injectable()
export class IsWalletAvailable implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async validate(walletAddress: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ walletAddress });

        return isNullOrUndefined(user);
    }

    defaultMessage(): string {
        return 'The wallet «$value» is already register.';
    }
}
