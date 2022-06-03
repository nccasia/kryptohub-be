import {SkillDistribution} from '@/skill-distribution/skill-distribution.entity';
import {Skill} from '@/skills/skills.entity';
import {ApiProperty} from '@nestjs/swagger';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
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

    @Column({nullable: true})
    teamSize?: string;

    @Column({nullable: true})
    timeZone?: string;

    @Column({nullable: true})
    organization?: string;

    @ManyToMany(() => Skill, (skill) => skill.team)
    @JoinTable()
    skills?: Skill[];

    @Column({nullable: true})
    workingTime?: string;

    @Column({nullable: true})
    hour?: string;

    @Column({nullable: true})
    week?: string;

    @Column({nullable: true})
    description?: string;

    @Column({nullable: true})
    avatar?: string;

    @Column({nullable: true})
    avatarUrl?: string;

    @Column({nullable: true})
    slogan?: string;

    @Column({nullable: true})
    founded?: string;

    @Column({nullable: true})
    linkWebsite?: string;

    @Column()
    createAt?: Date;

    @Column()
    updateAt?: Date;

    @Column({nullable: true})
    projectSize?: string;

    @Column({type: 'boolean', default: false})
    status?: boolean;

    @Column({nullable: true})
    location?: string;

    @OneToMany(() => SkillDistribution, (skill) => skill.team, {
        eager: false,
    })
    @JoinTable()
    skillDistribution?: SkillDistribution[];

    @ManyToOne((type) => User, (user) => user.team, {eager: false})
    user?: User;

    constructor(data: Partial<Team> = {}) {
        super();
        this.createAt = this.createAt || new Date();
        this.updateAt = new Date();
        Object.assign(this, data);
    }
}
