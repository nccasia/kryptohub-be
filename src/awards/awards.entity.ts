import {Team} from '@/team/team.entity';
import {ApiProperty} from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Awards extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({nullable: true})
  awardsTitle?: string;

  @Column({nullable: true})
  awardsWebsite?: string;

  @ManyToOne(() => Team, (team) => team.awards)
  team!: Team;

  constructor(data: Partial<Awards> = {}) {
    super();
    Object.assign(this, data);
  }
}
