import {ApiProperty} from '@nestjs/swagger';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Team} from '../team/team.entity';

export interface ISkillDistributionValue {
    field: string;
    quantity: string;
}

@Entity()
export class SkillDistribution extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    skillDistributionName?: string;

    @Column({type: 'jsonb'})
    skillDistributionValue?: string;

    @ManyToMany(() => Team, (team) => team.skillDistribution)
    team?: Team[];

    constructor(data: Partial<SkillDistribution> = {}) {
        super();
        Object.assign(this, data);
    }
}
