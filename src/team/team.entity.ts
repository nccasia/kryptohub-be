import {Awards} from '@/awards/awards.entity';
import {KeyClient} from '@/key-clients/key-clients.entity';
import {Portfolio} from '@/portfolio/portfolio.entity';
import {SkillDistribution} from '@/skill-distribution/skill-distribution.entity';
import {Skill} from '@/skills/skills.entity';
import {ApiProperty} from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @Column({nullable: true})
  teamSize?: string;

  @Column({nullable: true})
  timeZone?: string;

  @ManyToMany(() => Skill, (skill) => skill.team, {eager: true})
  @JoinTable()
  skills?: Skill[];

  @Column({nullable: true})
  workingTime?: string;

  @Column({nullable: true})
  saleEmail?: string;

  @Column({nullable: true})
  description?: string;

  @Column({nullable: true})
  imageUrl?: string;

  @Column({nullable: true})
  slogan?: string;

  @Column({nullable: true})
  founded?: string;

  @Column({nullable: true})
  linkWebsite?: string;

  @Column()
  createAt?: Date;

  @Column()
  updateAt?: Date;

  @Column({nullable: true})
  projectSize?: string;

  @Column({type: 'boolean', default: false})
  status?: boolean;

  @OneToMany(() => SkillDistribution, (skill) => skill.team, {
    eager: true,
  })
  @JoinTable()
  skillDistribution?: SkillDistribution[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.team, {
    eager: false,
  })
  @JoinTable()
  portfolios?: Portfolio[];

  @OneToMany(() => Awards, (awards) => awards.team, {
    eager: false,
  })
  awards?: Awards[];

  @OneToMany(() => KeyClient, (keyClient) => keyClient.team, {
    eager: false,
  })
  @JoinTable()
  keyClients?: KeyClient[];

  @ManyToOne((type) => User, (user) => user.team, {eager: false})
  user?: User;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(data: Partial<Team> = {}) {
    super();
    this.createAt = this.createAt || new Date();
    this.updateAt = new Date();
    Object.assign(this, data);
  }
}
