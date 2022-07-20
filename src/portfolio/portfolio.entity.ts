import {Team} from '@/team/team.entity';
import {ApiProperty} from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {PrivacyEnum} from './portfolio.enum';

@Entity()
export class Portfolio extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({nullable: true})
  companyName?: string;

  @Column({nullable: true})
  imageUrl?: string;

  @Column({nullable: true})
  videoLink?: string;

  @Column({nullable: true})
  content?: string;

  @Column({nullable: true})
  clientWebsite?: string;

  @Column({nullable: true})
  title?: string;

  @Column({nullable: true})
  category?: string;

  @Column({nullable: true})
  estimate?: string;

  @Column({nullable: true})
  startDate?: string;

  @Column({nullable: true})
  endDate?: string;

  @Column({nullable: true})
  description?: string;

  @Column({
    name: 'privacy',
    nullable: true,
    type: 'enum',
    enum: PrivacyEnum,
  })
  privacy?: PrivacyEnum;

  @ManyToOne(() => Team, (team) => team.portfolios)
  team?: Team;

  constructor(data: Partial<Portfolio> = {}) {
    super();
    Object.assign(this, data);
  }
}
