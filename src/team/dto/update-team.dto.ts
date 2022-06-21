import {KeyClient} from '@/key-clients/key-clients.entity';
import {Portfolio} from '@/portfolio/portfolio.entity';
import {SkillDistribution} from '@/skill-distribution/skill-distribution.entity';
import {Skill} from '@/skills/skills.entity';
import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class UpdateTeamDto {
  @ApiProperty()
  @IsOptional()
  teamName?: string;

  @ApiProperty()
  @IsOptional()
  teamSize?: string;

  @ApiProperty()
  @IsOptional()
  timeZone?: string;

  @ApiProperty()
  @IsOptional()
  skills?: Skill[];

  @ApiProperty()
  @IsOptional()
  skillDistribution?: SkillDistribution[];

  @ApiProperty()
  @IsOptional()
  slogan?: string;

  @ApiProperty()
  @IsOptional()
  workingTime?: string;

  @ApiProperty()
  @IsOptional()
  saleEmail?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty()
  @IsOptional()
  founded?: string;

  @ApiProperty()
  @IsOptional()
  linkWebsite?: string;

  @ApiProperty()
  @IsOptional()
  createAt?: Date;

  @ApiProperty()
  @IsOptional()
  updateAt?: Date;

  @ApiProperty()
  @IsOptional()
  projectSize?: string;

  @ApiProperty()
  @IsOptional()
  status?: boolean;
}
