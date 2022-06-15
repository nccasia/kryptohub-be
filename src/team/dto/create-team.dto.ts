import {CreateAwardsDto} from '@/awards/dto/create-adwards.dto';
import {CreateKeyClientDto} from '@/key-clients/dto/create-key-client.dto';
import {CreatePortfolioDto} from '@/portfolio/dto/create-portfolio.dto';
import {CreateSkillDistributionDto} from '@/skill-distribution/dto/create-skill-distribution.dto';
import {Skill} from '@/skills/skills.entity';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsNotEmpty, IsOptional, ValidateNested} from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  teamName?: string;

  @ApiProperty()
  @IsOptional()
  teamSize?: string;

  @ApiProperty()
  @IsOptional()
  timeZone?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => Skill)
  skills?: Skill[];

  @ApiProperty()
  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => CreateSkillDistributionDto)
  skillDistribution?: CreateSkillDistributionDto[];

  @ApiProperty()
  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => CreatePortfolioDto)
  portfolios?: CreatePortfolioDto[];

  @ApiProperty()
  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => CreateKeyClientDto)
  keyClients?: CreateKeyClientDto[];

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
