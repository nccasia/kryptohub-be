import {
    Controller,
    UseGuards,
    Get,
    UseInterceptors,
    ClassSerializerInterceptor,
    Param,
    ParseIntPipe,
    Put,
    Body,
} from '@nestjs/common';

import {UserService} from './user.service';
import {UserUpdate} from './dto/user-update.dto';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {User} from './user.entity';
import {ApiTags} from '@nestjs/swagger';
import {AuthUser} from './user.decorator';
import {SkillService} from '../skill/skill.service';

@ApiTags('Profile')
@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
    constructor(
        private readonly userService: UserService,
        private readonly skillService: SkillService,
    ) {}

    @Get('')
    @UseGuards(JWTAuthGuard)
    async me(@AuthUser() user: User) {
        const getUser = await this.userService.getSkillById(user.id as number);
        return getUser;
    }

    @Put('update/:id')
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updatesUser: UserUpdate,
    ) {
        const skills = await this.skillService.getSkillByIds(
            updatesUser.skills as any,
        );
        return this.userService.update(id, updatesUser, skills);
    }
}
