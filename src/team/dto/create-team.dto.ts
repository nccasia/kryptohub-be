import { CreateSkillDistributionDto } from '@/skill-distribution/dto/create-skill-distribution.dto';
import {Skill} from '@/skills/skills.entity';
import {ApiProperty} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {IsArray, IsNotEmpty, IsNotEmptyObject, IsOptional, ValidateNested} from 'class-validator';

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
    organization?: string;

    @ApiProperty()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Skill)
    skills?: Skill[];

    @ApiProperty()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateSkillDistributionDto)
    skillDistribution?: CreateSkillDistributionDto[];

    @ApiProperty()
    @IsOptional()
    slogan?: string;

    @ApiProperty()
    @IsOptional()
    workingTime?: string;

    @ApiProperty()
    @IsOptional()
    hour?: string;

    @ApiProperty()
    @IsOptional()
    week?: string;

    @ApiProperty()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsOptional()
    avatar?: string;

    @ApiProperty()
    @IsOptional()
    avatarUrl?: string;

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
    location?: string;

    @ApiProperty()
    @IsOptional()
    status?: boolean;
}
