import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import {Response} from 'express';
import {diskStorage} from 'multer';
import {HelperFile} from '../utils/helper';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {GetListTeamDto} from './dto/get-list-team.dto';
import {GetListTeamPagingDto} from './dto/get-team.dto';
import {extname} from 'path';

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
  async getTeamById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Team> {
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

  @UseGuards(JWTAuthGuard)
  @Put('upload/:id')
  @UseInterceptors(
    FileInterceptor('upload-team', {
      storage: diskStorage({
        destination: './upload/team',
        filename: HelperFile.customFilename,
      }),
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.teamService.uploadAvatar(id, file.path, file.fieldname);
  }

  @Get('team-image/:imageTeam')
  findProfileImage(
    @Param('imageTeam') imagename: string,
    @Res() res: Response,
  ) {
    return res.sendFile(imagename, {
      root: './upload/team',
    });
  }
  //   @Post(':id/avatar')
  //   @UseInterceptors(
  //     FileInterceptor('file', {
  //       storage: diskStorage({
  //         destination: './avatars',

  //         filename: (req, file, cb) => {
  //           const randomName = Array(32)
  //             .fill(null)
  //             .map(() => Math.round(Math.random() * 16).toString(16))
  //             .join('');
  //           return cb(null, `${randomName}${extname(file.originalname)}`);
  //         },
  //       }),
  //     }),
  //   )
  //   uploadAvatar(@Param('id') id, @UploadedFile() file) {
  //     console.log(file.path);

  //     this.teamService.setAvatar(Number(id), `http://localhost:3000${file.path}`);
  //   }

  //   @Get('avatars/:fileId')
  //   async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
  //     res.sendFile(fileId, {root: 'avatars'});
  //   }
}
