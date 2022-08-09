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

export enum JoinTeamStatus {
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  PENDING = 'pending',
}

export enum JoinTeamRole {
  MEMBER = 'member',
  NOT_ROLE = 'not_role',
}

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
    type: 'enum',
    enum: JoinTeamStatus,
    default: JoinTeamStatus.PENDING,
    nullable: false,
  })
  joinTeamStatus!: JoinTeamStatus;

  @Column({
    type: 'enum',
    enum: JoinTeamRole,
    default: JoinTeamRole.NOT_ROLE,
    nullable: false,
  })
  role?: JoinTeamRole;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(data: Partial<JoinTeam> = {}) {
    super();
    Object.assign(this, data);
  }
}
