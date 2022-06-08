import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {CreateSkillDistributionDto} from './dto/create-skill-distribution.dto';
import {UpdateSkillDistributionDto} from './dto/update-skill-distribution.dto';
import {SkillDistribution} from './skill-distribution.entity';
import {SkillDistributionService} from './skill-distribution.service';

@ApiTags('Skill distribution')
@ApiBearerAuth()
@Controller('skill-distribution')
export class SkillDistributionController {
    constructor(
        private readonly skillDistributionService: SkillDistributionService,
    ) {}

    @Post('create')
    @UseGuards(JWTAuthGuard)
    @HttpCode(HttpStatus.OK)
    async createSkillDistribution(
        @Body() createSkillDistributionDto: CreateSkillDistributionDto,
    ) {
        return this.skillDistributionService.create(createSkillDistributionDto);
    }

    @Get('getAll')
    @HttpCode(HttpStatus.OK)
    async getAllSkillDistribution(): Promise<SkillDistribution[]> {
        return await this.skillDistributionService.getAllSkillDistribution();
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JWTAuthGuard)
    async deleteSkillDistribution(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<void> {
        return await this.skillDistributionService.delete(id);
    }

    // @Put('update/:id')
    // @HttpCode(HttpStatus.OK)
    // @UseGuards(JWTAuthGuard)
    // async updateSkillDistribution(
    //     @Param('id', new ParseIntPipe()) id: number,
    //     @Body() updateSkillDistributionDto: UpdateSkillDistributionDto,
    // ) {
    //     return await this.skillDistributionService.update(
    //         id,
    //         updateSkillDistributionDto,
    //     );
    // }
}
