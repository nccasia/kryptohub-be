import {JWTAuthGuard} from '@/auth/guards/jwt-auth.guard';
import {AuthUser} from '@/user/user.decorator';
import {User} from '@/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {
  AddTeamMembersDto,
  DeleteMemberDto,
  GetListTeamMemberDto,
  JoinTeamDto,
} from './members.dto';
import {MembersService} from './members.service';

@ApiTags('Member')
@ApiBearerAuth()
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @UseGuards(JWTAuthGuard)
  @Get('list')
  async listMember(
    @AuthUser() user: User,
    @Query() query: GetListTeamMemberDto,
  ) {
    return await this.membersService.getList(user, query);
  }

  @UseGuards(JWTAuthGuard)
  @Get('getAll/:id')
  async getAllMembers(@Param('id') teamId: number) {
    return await this.membersService.getAllMembers(teamId);
  }

  @UseGuards(JWTAuthGuard)
  @Post('add')
  async addMember(@AuthUser() user: User, @Body() body: AddTeamMembersDto) {
    await this.membersService.addTeamMembers(user, body);
    return;
  }

  @UseGuards(JWTAuthGuard)
  @Post('join-team')
  async joinTeam(@AuthUser() user: User, @Body() body: JoinTeamDto) {
    return await this.membersService.joinTeam(user, body);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('remove-member')
  async removeMember(@AuthUser() user: User, @Query() query: DeleteMemberDto) {
    await this.membersService.removeMember(user, query);
    return;
  }
}
