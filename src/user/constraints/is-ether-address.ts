import {Injectable} from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { toChecksumAddress } from 'ethereum-checksum-address';
import {isNullOrUndefined} from 'util';


@ValidatorConstraint({name: 'isUserAlreadyExist', async: true})
@Injectable()
export class IsEtherAddress implements ValidatorConstraintInterface {

    async validate(walletAddress: string): Promise<boolean> {
        try {
            toChecksumAddress(walletAddress);
            return true;
        } catch(e) {
            return false;
        }
    }

    defaultMessage(): string {
        return 'Invalid wallet address «$value».';
    }
}
