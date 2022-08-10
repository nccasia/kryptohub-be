import {JWTAuthGuard} from '@/auth/guards/jwt-auth.guard';
import {AuthUser} from '@/user/user.decorator';
import {User} from '@/user/user.entity';
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
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AddContactJoinTeamDto} from './dto/join-team.dto';
import {UpdateStatusJoinTeam} from './dto/update-status-join-team.dto';
import {JoinTeam} from './join-team.entity';
import {JoinTeamService} from './join-team.service';

@ApiTags('JoinTeam')
@ApiBearerAuth()
@Controller('join-team')
export class JoinTeamController {
  constructor(private readonly joinTeamService: JoinTeamService) {}

  @Post('contact-join-team')
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  async contactJoinTeam(
    @AuthUser() user: User,
    @Body() AddContactJoinTeamDto: AddContactJoinTeamDto,
  ) {
    return await this.joinTeamService.addContactJoinTeam(
      AddContactJoinTeamDto,
      user,
    );
  }

  @Get('get-all-contact')
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllContactJoinTeam(): Promise<JoinTeam[]> {
    return await this.joinTeamService.getAllUserContactJoinTeams();
  }

  @Put('change-status-join-team/:id')
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateStatusJoinTeam(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateStatusJoinTeam: UpdateStatusJoinTeam,
  ) {
    return await this.joinTeamService.updateStatusJoinTeam(
      id,
      updateStatusJoinTeam,
    );
  }

  @Delete('delete/:id')
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteContactJoinTeam(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    return await this.joinTeamService.deleteContactJoinTeam(id);
  }
}
