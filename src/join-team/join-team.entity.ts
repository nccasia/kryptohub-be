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

  @ManyToOne(() => Team)
  @JoinColumn()
  team!: Team;

  @ManyToOne(() => User, {nullable: true, eager: true})
  @JoinColumn()
  user?: User;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  emailAddress!: string;

  @Column({
   default: false,
  })
  verified?: boolean;

  @Column({
    default: false,})
  isApproved?: boolean;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(data: Partial<JoinTeam> = {}) {
    super();
    Object.assign(this, data);
  }
}
