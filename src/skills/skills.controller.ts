import {Controller, Get, Query} from '@nestjs/common';
import {SkillService} from './skills.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {GetListSkillDto} from './dto/skills.dto';

@ApiTags('Skill')
@ApiBearerAuth()
@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @Get('list')
    async getList(@Query() query: GetListSkillDto) {
        return await this.skillService.getList(query);
    }
}
