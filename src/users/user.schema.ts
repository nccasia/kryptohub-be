import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsDate, IsEmail, Length} from 'class-validator';
import * as bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer';
import {EthereumAddress} from '../utils/EthereumAddress';
import {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        type: 'varchar',
        length: '42',
        unique: true,
    })
    ethereumAddress!: EthereumAddress;

    @Prop({
        type: 'varchar',
        length: 20,
        unique: true,
        nullable: true,
    })
    @Length(3, 20)
    username?: string;

    @Prop({
        name: 'password',
        type: 'varchar',
        length: '60',
        nullable: true,
    })
    @Exclude()
    private _password?: string;

    @Prop({nullable: true})
    @IsEmail()
    @Length(5, 255)
    email?: string;

    @Prop({default: false})
    verified?: boolean;

    @Prop({nullable: true})
    firstName?: string;

    @Prop({nullable: true})
    lastName?: string;

    @Prop({nullable: true})
    @IsDate()
    dateOfBirth?: Date;

    @Prop({nullable: true})
    phone?: string;

    set password(password) {
        if (password) {
            this._password = bcrypt.hashSync(password, 2);
        } else {
            this._password = null;
        }
    }

    get password() {
        return this._password;
    }

    async comparePassword(password) {
        if (this.password) {
            return await bcrypt.compare(password, this.password);
        }
        return false;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);
