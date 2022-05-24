import {ApiProperty} from '@nestjs/swagger';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import {User} from '../../user/user.entity';

@Entity()
export class Skill extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    skillId?: number;

    @ApiProperty()
    @Column()
    skillName?: string;

    @ManyToOne((type) => User, (user) => user.skills, {eager: false})
    user?: User;

    constructor(data: Partial<Skill> = {}) {
        super();
        Object.assign(this, data);
    }
}

