import {Team} from '@/team/team.entity';
import {User} from '@/user/user.entity';
import {ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
} from 'typeorm';

@Entity()
export class Skill extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    skillName!: string;

    @ManyToMany(() => User, (user) => user.skills)
    users?: User[];

    @ManyToMany(() => Team, (team) => team.skills)
    team?: Team[];

    constructor(data: Partial<Skill> = {}) {
        super();
        Object.assign(this, data);
    }
}
