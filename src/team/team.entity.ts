import {ApiProperty} from '@nestjs/swagger';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from '../user/user.entity';

// export enum CreateTeamEnum {
//     Play,
//     Free,
// }

@Entity()
export class Team extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    teamName?: string;

    @Column()
    quantity?: string;

    @Column()
    timeZone?: string;

    @Column()
    project?: string;

    @Column()
    skill?: string;

    @Column()
    workingTime?: string;

    @Column()
    description?: string;

    @Column()
    wallet?: string;

    @ManyToOne((type) => User, (user) => user.team, {eager: false})
    user?: User;

    constructor(data: Partial<Team> = {}) {
        super();
        Object.assign(this, data);
    }
}
