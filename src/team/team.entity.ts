import {ApiProperty} from '@nestjs/swagger';
import {
    BaseEntity,
    Column,
    Entity,
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

    @Column({type: 'text', array: true})
    skill?: string[];

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

    @ManyToOne((type) => User, (user) => user.team, {eager: false})
    user?: User;

    @Column()
    userId?: number;

    constructor(data: Partial<Team> = {}) {
        super();
        Object.assign(this, data);
    }
}
