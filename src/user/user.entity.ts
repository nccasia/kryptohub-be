import {ApiProperty} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    BaseEntity,
} from 'typeorm';

export enum SocialProviderTypes {
    USERNAME = 'username',
    GOOGLE = 'google',
    GITHUB = 'github',
}

@Entity()
export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        name: 'provider',
        nullable: true,
        type: 'enum',
        enum: SocialProviderTypes,
    })
    provider?: SocialProviderTypes;

    @ApiProperty()
    @Column()
    username?: string;

    @Column({
        unique: true,
        length: 200,
    })
    displayName?: string;

    @Column({
        length: 200,
    })
    firstName?: string;

    @Column({
        length: 200,
    })
    lastName?: string;

    @ApiProperty()
    @Column({unique: true})
    email?: string;

    @ApiProperty()
    @Column()
    @Exclude()
    password?: string;

    // @ApiProperty()
    // @Column()
    // @Exclude()
    // confirmPassword?: string;

    @Column()
    nonce?: string;

    @Column()
    walletAddress?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    constructor(data: Partial<User> = {}) {
        super();
        Object.assign(this, data);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt();
        if (this.password && !/^\$2a\$\d+\$/.test(this.password)) {
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    @BeforeInsert()
    async genNonce() {
        const salt = await bcrypt.genSalt();
        this.nonce = salt;
    }

    async checkPassword(plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, this.password);
    }
}
