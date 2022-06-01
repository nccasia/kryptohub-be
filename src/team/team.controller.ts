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
import {SkillService} from '../skills/skills.service';
import {SkillDistributionService} from '@/skill-distribution/skill-distribution.service';
import {Skill} from '@/skills/skills.entity';
import {SkillDistribution} from '@/skill-distribution/skill-distribution.entity';
@Controller('team')
export class TeamController {
    constructor(
        private readonly teamService: TeamService,
        private readonly skillService: SkillService,
        private readonly skillDistributionService: SkillDistributionService,
    ) {}

    @UseGuards(JWTAuthGuard)
    @Post('create')
    @HttpCode(HttpStatus.OK)
    async createTeam(
        @Body() createTeamDto: CreateTeamDto,
        @AuthUser() user: User,
    ) {
        // const skill = await this.skillService.getSkillByIds(
        //     createTeamDto.skills as any,
        // );

        const skillDistribution =
            await this.skillDistributionService.getSkillDistributionById(
                createTeamDto.skillDistribution as any,
            );

        return await this.teamService.createTeam(
            createTeamDto,
            user,
            // skill,
            skillDistribution,
        );
    }

    @Get('getAll')
    @HttpCode(HttpStatus.OK)
    async getAllTeam(): Promise<Team[]> {
        return await this.teamService.getAllTeam();
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
        const skillDistribution =
            await this.skillDistributionService.getSkillDistributionById(
                updateTeamDto.skillDistribution as any,
            );
        return await this.teamService.updateTeam(
            id,
            updateTeamDto,
            skillDistribution,
        );
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
