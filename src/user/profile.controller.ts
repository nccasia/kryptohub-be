import {
  Controller,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Body,
  HttpCode,
  Post,
  HttpStatus,
  Param,
  UploadedFile,
  HttpException,
  Res,
} from '@nestjs/common';

import {UserService} from './user.service';
import {UserUpdate} from './dto/user-update.dto';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {User} from './user.entity';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthUser} from './user.decorator';
import {SkillService} from '../skills/skills.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {editFileName, imageFileFilter} from '@utils/helper';

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

  @Get('/get-profile-team')
  @UseGuards(JWTAuthGuard)
  async getProfile(@AuthUser() user: User) {
    const getUser = await this.userService.getProfileMyTeam(user.id as number);
    return getUser;
  }

  @Put('update')
  @UseGuards(JWTAuthGuard)
  async update(@AuthUser() user: User, @Body() updatesUser: UserUpdate) {
    return this.userService.update(user.id as number, updatesUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/check-email')
  @UseGuards(JWTAuthGuard)
  async checkExistEmail(@Body() emailAddress: any) {
    return await this.userService.checkExistEmail(emailAddress.emailAddress);
  }

  @Post(':id/image')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/avatars',

        filename: editFileName,
      }),
      limits: {
        fileSize: 1024 * 1024 * 15,
      },
      fileFilter: imageFileFilter,
    }),
  )
  async uploadAvatar(@Param('id') id, @UploadedFile() file) {
    try {
      await this.userService.setImage(Number(id), file.filename);
      return {message: 'Upload file successful', imageUrl: file.filename};
    } catch (error) {
      throw new HttpException('Upload file failed', HttpStatus.OK);
    }
  }

  @Get('getImage/:imgpath')
  async seenImage(@Param('imgpath') imgpath, @Res() res): Promise<any> {
    res.sendFile(imgpath, {root: './upload/avatars'});
  }
}
