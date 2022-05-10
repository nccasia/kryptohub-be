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
} from 'typeorm';

export enum SocialProviderTypes {
    GOOGLE = 'google',
    GITHUB = 'github',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        name: 'provider',
        nullable: true,
        type: 'enum',
        enum: SocialProviderTypes,
    })
    provider?: SocialProviderTypes;

    @Column()
    username?: string;

    @Column()
    name?: string;

    @Column()
    email?: string;

    @Column()
    @Exclude()
    password?: string;

    @Column()
    nonce?: string;

    @Column({ unique: true })
    walletAddress?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    constructor(data: Partial<User> = {}) {
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
