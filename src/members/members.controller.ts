import {JWTAuthGuard} from '@/auth/guards/jwt-auth.guard';
import {AuthUser} from '@/user/user.decorator';
import {User} from '@/user/user.entity';
import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AddTeamMembersDto, GetListTeamMemberDto} from './members.dto';
import {MembersService} from './members.service';

@ApiTags('Member')
@ApiBearerAuth()
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @UseGuards(JWTAuthGuard)
  @Get('list')
  async listMember(@AuthUser() user: User, @Body() body: GetListTeamMemberDto) {
    return await this.membersService.getList(user, body);
  }

  @UseGuards(JWTAuthGuard)
  @Post('add')
  async addMember(@AuthUser() user: User, @Body() body: AddTeamMembersDto) {
    await this.membersService.addTeamMembers(user, body);
    return;
  }
}

