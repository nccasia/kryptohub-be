import {Team} from '@/team/team.entity';
import {User} from '@/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class JoinTeam extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne(() => Team, {nullable: true, eager: true})
  // @JoinColumn()
  // team!: Team;

  @Column({nullable: true})
  teamId!: number;

  // @ManyToOne(() => User, {nullable: true, eager: false})
  // @JoinColumn()
  @Column({nullable: true})
  userId!: number;

  @Column()
  emailAddress!: string;

  @Column({
    default: false,
  })
  verified?: boolean;

  @Column({
    default: false,
  })
  isApproved?: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(data: Partial<JoinTeam> = {}) {
    super();
    Object.assign(this, data);
  }
}
