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

    @ApiProperty()
    @Column()
    username?: string;

    @ApiProperty()
    @Column({unique: true})
    emailAddress?: string;

    @ApiProperty()
    @Column()
    @Exclude()
    password?: string;

    @ApiProperty()
    @Column({unique: true})
    githubAddress?: string;

    @ApiProperty()
    @Column({unique: true})
    googleAddress?: string;

    @ApiProperty()
    @Column({unique: true})
    description?: string;

    @ApiProperty()
    @Column({unique: true})
    avatarPath?: string;

    @ApiProperty()
    @Column({unique: true})
    @ApiProperty()
    link?: string;

    @ApiProperty()
    @Column({unique: true})
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
