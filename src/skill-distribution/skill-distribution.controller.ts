import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {CreateSkillDistributionDto} from './dto/create-skill-distribution.dto';
import {SkillDistributionService} from './skill-distribution.service';

@Controller('skill-distribution')
export class SkillDistributionController {
    constructor(
        private readonly skillDistributionService: SkillDistributionService,
    ) {}

    @Post('create')
    @UseGuards(JWTAuthGuard)
    async createSkillDistribution(
        @Body() createSkillDistributionDto: CreateSkillDistributionDto,
    ) {
        return this.skillDistributionService.create(createSkillDistributionDto);
    }
}
