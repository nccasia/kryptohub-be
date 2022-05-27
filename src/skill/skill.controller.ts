import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    UseGuards,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import {SkillService} from './skill.service';
import {CreateSkillDto} from './dto/create-skill.dto';
import {UpdateSkillDto} from './dto/update-skill.dto';
import {AuthUser} from '../user/user.decorator';
import {User} from '../user/user.entity';
import {ApiTags} from '@nestjs/swagger';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';

@ApiTags('Skill')
@Controller('skill')
@UseGuards(JWTAuthGuard)
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @Post('create')
    @HttpCode(HttpStatus.OK)
    create(@Body() createSkillDto: CreateSkillDto) {
        return this.skillService.create(createSkillDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.skillService.findAll();
    }

    @Put('update/:skillId')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('skillId', new ParseIntPipe()) skillId: number,
        @Body() updatesSkill: UpdateSkillDto,
    ) {
        return this.skillService.update(skillId, updatesSkill);
    }

    @Get('get/:skillId')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('skillId') skillId) {
        return this.skillService.finById(skillId);
    }

    @Delete('delete/:skillId')
    @HttpCode(HttpStatus.OK)
    remove(@Param('skillId') skillId: number) {
        return this.skillService.remove(skillId);
    }
}
