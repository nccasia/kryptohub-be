import { toChecksumAddress } from 'ethereum-checksum-address';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';

@Injectable()
export class Web3Strategy extends PassportStrategy(Strategy, 'web3') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(request: Request): Promise<User> {
        
        const credentials = this.getCredentials(request);

        if (!credentials) {
            throw new BadRequestException("Missing credentials");
        }

        const verified = this.verifySignature(credentials);
        if(!verified) {
            throw new UnauthorizedException("Unauthorized");
        }

        return this.authService.loginWeb3(credentials.address);
    }

    verifySignature(credentials): boolean {
        const { address, msg, signed } = credentials;

        const params = {
            data: msg,
            signature: signed
        };
        const recovered = recoverPersonalSignature(params);
        const addressSum = toChecksumAddress(address);
        const recoveredSum = toChecksumAddress(recovered);
        if (!recovered || addressSum !== recoveredSum) {
            throw new BadRequestException('Invalid credentials (recovered address didnt match eth address)');
        }

        return true;
    }

    getCredentials(req) {
        const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
        const hasAll = (obj, keys) => obj && keys.every(k => has(obj, k));

        const { body, query } = req;
        const paramKeys = ['address', 'msg', 'signed'];

        if (hasAll(body, paramKeys)) {
            return body;
        } else if (hasAll(query, paramKeys)) {
            return query;
        }

        return null;
    }
}
