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
import {Awards} from './awards.entity';
import {AwardsService} from './awards.service';
import {CreateAwardsDto} from './dto/create-adwards.dto';
import {UpdateAwardsDto} from './dto/update-awards.dto';

@ApiTags('Awards')
@ApiBearerAuth()
@Controller('awards')
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createAwards(
    @Body() createAwardsDto: CreateAwardsDto,
    @AuthUser() user: User,
  ) {
    return await this.awardsService.createAwards(createAwardsDto, user);
  }

  @UseGuards(JWTAuthGuard)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateAwards(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateAwardsDto: UpdateAwardsDto,
  ) {
    return await this.awardsService.updateAwards(id, updateAwardsDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTAuthGuard)
  async deleteAwards(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    return await this.awardsService.deleteAwards(id);
  }

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async getAwardsById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Awards[]> {
    return await this.awardsService.getAwardsById(id);
  }

  @Get('getAllAwards/:teamId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTAuthGuard)
  async getAllAwardsByTeamId(
    @Param('teamId', new ParseIntPipe()) teamId: number,
  ): Promise<Awards[]> {
    return await this.awardsService.getAllAwardsByTeamId(teamId);
  }
}
