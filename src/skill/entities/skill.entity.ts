import {ApiProperty} from '@nestjs/swagger';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity()
export class Skill extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    SkillId?: number;

    @ApiProperty()
    @Column()
    SkillName?: string;
}

