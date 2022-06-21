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
export class KeyClient extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({type: 'simple-json', nullable: true})
  keyName?: string;

  @ManyToOne(() => Team, (team) => team.keyClients)
  team!: Team;

  constructor(data: Partial<KeyClient> = {}) {
    super();
    Object.assign(this, data);
  }
}
