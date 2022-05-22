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

    @Column()
    skill?: string;

    @Column()
    workingTime?: string;

    @Column()
    description?: string;

    @Column()
    avatar?: string;

    @ManyToOne((type) => User, (user) => user.team, {eager: false})
    user?: User;

    constructor(data: Partial<Team> = {}) {
        super();
        Object.assign(this, data);
    }
}
