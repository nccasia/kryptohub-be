import {ApiProperty} from '@nestjs/swagger';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Team} from '../team/team.entity';

export interface IFocusValue {
    field: string;
    quantity: string;
}

@Entity()
export class Focus extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    focusName?: string;

    @Column({type: 'jsonb'})
    focusValue?: string;

    @ManyToMany(() => Team, (team) => team.focus)
    team?: Team[];

    constructor(data: Partial<Focus> = {}) {
        super();
        Object.assign(this, data);
    }
}
