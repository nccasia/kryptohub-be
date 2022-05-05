import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { IsDefined, Validate } from "class-validator";
import { IsEtherAddress } from "../../user/constraints/is-ether-address";

export class GetAuthDataQueryDTO {
    @ApiProperty()
    @IsDefined()
    @Validate(IsEtherAddress)
    address!: string;
}