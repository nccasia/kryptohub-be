import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {AuthUser} from '../user/user.decorator';
import {User} from '../user/user.entity';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {Team} from './team.entity';
import {TeamService} from './team.service';
import {diskStorage} from 'multer';
import {editFileName, imageFileFilter} from '../utils/helper';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {GetListTeamDto} from './dto/get-list-team.dto';
import {GetListTeamPagingDto} from './dto/get-team.dto';

@ApiTags('Team')
@ApiBearerAuth()
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createTeam(
    @Body() createTeamDto: CreateTeamDto,
    @AuthUser() user: User,
  ) {
    return await this.teamService.createTeam(user, createTeamDto);
  }

  @Get('getAllPaging')
  @HttpCode(HttpStatus.OK)
  async getAllPagingTeam(@Query() query: GetListTeamPagingDto) {
    return await this.teamService.getAllTeamPagging(query);
  }

  @Get('getAll')
  @HttpCode(HttpStatus.OK)
  async getAllTeam(): Promise<Team[]> {
    return await this.teamService.getAllTeam();
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getList(@Query() query: GetListTeamDto) {
    return await this.teamService.getList(query);
  }

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async getTeamById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.teamService.getTeamById(id);
  }

  @UseGuards(JWTAuthGuard)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateTeam(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return await this.teamService.updateTeam(id, updateTeamDto);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteTeam(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return await this.teamService.deleteTeam(id);
  }

  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/team',

        filename: editFileName,
      }),
      limits: {
        fileSize: 1024 * 1024 * 15,
      },
      fileFilter: imageFileFilter,
    }),
  )
  async uploadImage(@Param('id') id, @UploadedFile() file) {
    try {
      await this.teamService.setAvatar(Number(id), file.filename);
    } catch (error) {
      throw new HttpException('Upload file failed', HttpStatus.OK);
    }
  }

  @Get('getImage/:imgpath')
  async seenImage(@Param('imgpath') imgpath, @Res() res): Promise<any> {
    res.sendFile(imgpath, {root: './upload/team'});
  }
}
