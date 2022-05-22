import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {AuthUser} from '../user/user.decorator';
import {User} from '../user/user.entity';
import {CreateTeamDto} from './dto/create-team.dto';
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
    ) {
        return this.teamService.createTeam(createTeamDto, user);
    }
}
