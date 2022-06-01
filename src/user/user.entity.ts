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
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import {Skill} from '../skill/entities/skill.entity';
import {Team} from '../team/team.entity';

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

    @ApiProperty()
    @Column()
    emailAddress?: string;

    @ApiProperty()
    @Column()
    @Exclude()
    password?: string;

    @ApiProperty()
    @Column()
    githubAddress?: string;

    @ApiProperty()
    @Column()
    googleAddress?: string;
    
    @ApiProperty()
    @Column()
    profileLink?: string;

    @ApiProperty()
    @Column()
    avatarPath?: string;

    @ApiProperty()
    @Column()
    status?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @OneToMany((type) => Team, (team) => team.user, {eager: true})
    team?: Team[];

    @ManyToMany(() => Skill, (skill) => skill.users)
    @JoinTable()
    skills?: Skill[];

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

    async checkPassword(plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, this.password);
    }
}
