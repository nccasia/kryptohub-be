import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {SkillService} from './skills.service';
import {ApiTags} from '@nestjs/swagger';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {GetListSkillDto} from './dto/skills.dto';

@ApiTags('Skill')
@Controller('skill')
@UseGuards(JWTAuthGuard)
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @Get('list')
    async getList(@Query() query: GetListSkillDto) {
        return await this.skillService.getList(query);
    }
}