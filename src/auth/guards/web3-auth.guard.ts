import {Injectable, ExecutionContext} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class Web3AuthGuard extends AuthGuard('web3') {

}
