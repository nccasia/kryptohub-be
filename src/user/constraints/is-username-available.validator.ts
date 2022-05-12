import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {Repository} from 'typeorm';
import {isNullOrUndefined} from 'util';

import {User} from '../user.entity';

@ValidatorConstraint({name: 'IsUsernameAvailable', async: true})
@Injectable()
export class IsUsernameAvailable implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async validate(username: string): Promise<boolean> {
        const user = await this.userRepository.findOne({username});

        return isNullOrUndefined(user);
    }

    defaultMessage(): string {
        return 'The username «$value» is already register.';
    }
}
