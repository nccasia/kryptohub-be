import {Team} from '@/team/team.entity';
import {User} from '@/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum InviteStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}
export enum MemberRole {
  LEADER = 'leader',
  MEMBER = 'member'
}

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Team)
  @JoinColumn()
  team!: Team;

  @ManyToOne(() => User, {nullable: true, eager: true})
  @JoinColumn()
  user?: User;

  @Column()
  emailAddress!: string;

  @Column({
    type: 'enum',
    enum: InviteStatus,
    default: InviteStatus.PENDING,
    nullable: false,
  })
  inviteStatus!: InviteStatus;

  @Column({
    type: 'enum',
    enum: MemberRole,
    default: MemberRole.MEMBER,
    nullable: false,
  })
  role!: MemberRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(data: Partial<Member> = {}) {
    super();
    Object.assign(this, data);
  }
}

