import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class JoinTeam extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: true})
  teamId!: number;

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
