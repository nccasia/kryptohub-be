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
    Query,
    UseGuards,
} from '@nestjs/common';
import {SkillService} from './skills.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CreateSkillDto, GetListSkillDto} from './dto/create-skills.dto';
import {Skill} from './skills.entity';
import {JWTAuthGuard} from '@/auth/guards/jwt-auth.guard';
import {UpdateSkillDto} from './dto/update-skill.dto';

@ApiTags('Skill')
@ApiBearerAuth()
@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @Get('list')
    @HttpCode(HttpStatus.OK)
    async getList(@Query() query: GetListSkillDto) {
        return await this.skillService.getList(query);
    }

    @Get('getAll')
    @HttpCode(HttpStatus.OK)
    async getAllSkill(): Promise<Skill[]> {
        return await this.skillService.getAllSkill();
    }

    @Get('get/:skillId')
    @HttpCode(HttpStatus.OK)
    async getSkillById(@Param('skillId') skillId) {
        return await this.skillService.getSkillByIds(skillId);
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JWTAuthGuard)
    async createSkill(
        @Body() createSkillDto: CreateSkillDto,
    ): Promise<Skill | undefined> {
        return await this.skillService.create(createSkillDto);
    }

    @Put('update/:skillId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JWTAuthGuard)
    async updateSkill(
        @Param('skillId', new ParseIntPipe()) skillId: number,
        @Body() updatesSkill: UpdateSkillDto,
    ): Promise<Skill | undefined> {
        return await this.skillService.update(skillId, updatesSkill);
    }

    @Delete('delete/:skillId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JWTAuthGuard)
    async deleteSkill(@Param('skillId') skillId: number): Promise<void> {
        return await this.skillService.delete(skillId);
    }
}
