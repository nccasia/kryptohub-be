import {JWTAuthGuard} from '@/auth/guards/jwt-auth.guard';
import {AuthUser} from '@/user/user.decorator';
import {User} from '@/user/user.entity';
import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AddContactJoinTeamDto} from './dto/join-team.dto';
import {JoinTeamService} from './join-team.service';

@ApiTags('JoinTeam')
@ApiBearerAuth()
@Controller('join-team')
export class JoinTeamController {
  constructor(private readonly joinTeamService: JoinTeamService) {}

  @Post('contact-join-team')
  @UseGuards(JWTAuthGuard)
  async contactJoinTeam(
    @AuthUser() user: User,
    @Body() AddContactJoinTeamDto: AddContactJoinTeamDto,
  ) {
    return await this.joinTeamService.addContactJoinTeam(
      AddContactJoinTeamDto,
      user,
    );
  }
}
