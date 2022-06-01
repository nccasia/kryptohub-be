import {ApiProperty} from '@nestjs/swagger';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Focus} from '../focus/focus.entity';
import {Skill} from '../skill/entities/skill.entity';
import {User} from '../user/user.entity';

@Entity()
export class Team extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    teamName?: string;

    @Column()
    teamSize?: string;

    @Column()
    timeZone?: string;

    @Column()
    organization?: string;

    @ManyToMany(() => Skill, (skill) => skill.team)
    @JoinTable()
    skills?: Skill[];

    @Column()
    workingTime?: string;

    @Column()
    hour?: string;

    @Column()
    week?: string;

    @Column()
    description?: string;

    @Column()
    avatar?: string;

    @Column()
    avatarUrl?: string;

    @Column()
    slogan?: string;

    @Column()
    founded?: string;

    @Column()
    linkWebsite?: string;

    @Column()
    createAt?: Date;

    @Column()
    updateAt?: Date;

    @Column()
    projectSize?: string;

    @Column({type: 'boolean', default: false})
    status?: boolean;

    @Column()
    location?: string;

    @ManyToMany((type) => Focus, (focus) => focus.team, {eager: false})
    @JoinTable()
    focus?: Focus[];

    @ManyToOne((type) => User, (user) => user.team, {eager: false})
    user?: User;

    // @Column()
    // userId?: number;

    constructor(data: Partial<Team> = {}) {
        super();
        Object.assign(this, data);
    }
}
