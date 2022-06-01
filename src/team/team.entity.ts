import {SkillDistribution} from '@/skill-distribution/skill-distribution.entity';
import {Skill} from '@/skill/skill.entity';
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

    @ManyToMany((type) => SkillDistribution, (skill) => skill.team, {
        eager: false,
    })
    @JoinTable()
    skillDistribution?: SkillDistribution[];

    @ManyToOne((type) => User, (user) => user.team, {eager: false})
    user?: User;

    constructor(data: Partial<Team> = {}) {
        super();
        Object.assign(this, data);
    }
}
