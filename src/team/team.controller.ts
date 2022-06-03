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
import {query, Response} from 'express';
import {diskStorage} from 'multer';
import {HelperFile} from '../utils/helper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetListTeamDto } from './dto/team.dto';
import { GetListTeamPagingDto } from './dto/get-team.dto';

@ApiTags('Team')
@ApiBearerAuth()
@Controller('team')
@UseGuards(JWTAuthGuard)
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

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

    @Get('/:id')
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
    ): Promise<Team> {
        return await this.teamService.updateTeam(id, updateTeamDto);
    }

    @UseGuards(JWTAuthGuard)
    @Delete('delete/:id')
    @HttpCode(HttpStatus.OK)
    async deleteTeam(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<void> {
        return await this.teamService.deleteTeam(id);
    }

    @UseGuards(JWTAuthGuard)
    @Post('file-upload')
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: './upload/avatar',
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
        return await this.teamService.uploadAvatar(
            id,
            file.path,
            file.fieldname,
        );
    }

    @Get('profile-image/:imagename')
    findProfileImage(
        @Param('imagename') imagename: string,
        @Res() res: Response,
    ) {
        return res.sendFile(imagename, {
            root: './upload/avatar',
        });
    }
}

