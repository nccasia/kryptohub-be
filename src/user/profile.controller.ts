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
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthUser} from './user.decorator';
import {SkillService} from '../skills/skills.service';

@ApiTags('Profile')
@ApiBearerAuth()
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

    @Put('update')
    @UseGuards(JWTAuthGuard)
    async update(
        @AuthUser() user: User,
        @Body() updatesUser: UserUpdate,
    ) {
        return this.userService.update(user.id as number, updatesUser);
    }
}
