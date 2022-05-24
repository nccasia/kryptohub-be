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

@ApiTags('Profile')
@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    @UseGuards(JWTAuthGuard)
    me(@AuthUser() user: User): User {
        return user;
    }

    @Put('update/:id')
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updatesUser: UserUpdate,
    ) {
        return this.userService.update(id, updatesUser);
    }
}
