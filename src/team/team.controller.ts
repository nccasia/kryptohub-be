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
    UseGuards,
} from '@nestjs/common';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {AuthUser} from '../user/user.decorator';
import {User} from '../user/user.entity';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {Team} from './team.entity';
import {TeamService} from './team.service';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @UseGuards(JWTAuthGuard)
    @Post('create')
    @HttpCode(HttpStatus.OK)
    async createTeam(
        @Body() createTeamDto: CreateTeamDto,
        @AuthUser() user: User,
    ): Promise<Team> {
        return await this.teamService.createTeam(createTeamDto, user);
    }

    @UseGuards(JWTAuthGuard)
    @Get('getAll')
    @HttpCode(HttpStatus.OK)
    async getAllTeam(): Promise<Team[]> {
        return await this.teamService.getAllTeam();
    }

    @UseGuards(JWTAuthGuard)
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
}
