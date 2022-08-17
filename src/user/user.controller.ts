import {JWTAuthGuard} from '@/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {AddShortListDto} from './dto/user-update.dto';
import {AuthUser} from './user.decorator';
import {User} from './user.entity';
import {UserService} from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('short-list')
  @UseGuards(JWTAuthGuard)
  async getShortList(@AuthUser() user) {
    return await this.userService.getShortList(user);
  }

  @Post('add-short-list')
  @UseGuards(JWTAuthGuard)
  async addSortList(@AuthUser() user: User, @Body() body: AddShortListDto) {
    await this.userService.addShortList(user, body.teamId);
    return;
  }

  @Delete('remove-short-list/:id')
  @UseGuards(JWTAuthGuard)
  async removeSortList(@AuthUser() user: User, @Param() param) {
    await this.userService.removeShortList(user, param.id);
    return;
  }

  @Delete('remove-all-short-list')
  @UseGuards(JWTAuthGuard)
  async removeAllSortList(@AuthUser() user: User) {
    await this.userService.removeAllShortList(user);
    return;
  }

  @Get('share-short-list/:token')
  @UseGuards(JWTAuthGuard)
  async getShareShortListLinkWithAccessToken(
    @AuthUser() user: User,
    @Param() param,
  ) {
    return await this.userService.getShareShortListLinkWithAccessToken(
      user,
      param.token,
    );
  }
}
