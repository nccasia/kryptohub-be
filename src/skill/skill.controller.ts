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
} from '@nestjs/common';
import {SkillService} from './skill.service';
import {CreateSkillDto} from './dto/create-skill.dto';
import {UpdateSkillDto} from './dto/update-skill.dto';
import {AuthUser} from '../user/user.decorator';
import {User} from '../user/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Skill')
@Controller('skill')
@UseGuards(JWTAuthGuard)
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @Post('create')
    @HttpCode(HttpStatus.OK)
    create(@Body() createSkillDto: CreateSkillDto, @AuthUser() user: User) {
        return this.skillService.create(createSkillDto, user);
    }

    @Get()
    findAll() {
        return this.skillService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.skillService.findOne(+id);
    // }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
        return this.skillService.update(+id, updateSkillDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.skillService.remove(+id);
    }
}

