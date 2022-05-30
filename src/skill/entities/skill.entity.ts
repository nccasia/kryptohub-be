import {ApiProperty} from '@nestjs/swagger';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import {User} from '../../user/user.entity';

@Entity()
export class Skill extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @Column()
    skillName?: string;

    @ManyToMany(() => User, (user)=> user.skills)
    users?: User[];

    constructor(data: Partial<Skill> = {}) {
        super();
        Object.assign(this, data);
    }
}
