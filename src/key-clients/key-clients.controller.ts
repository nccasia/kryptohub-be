import {JWTAuthGuard} from '@/auth/guards/jwt-auth.guard';
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
import {CreateKeyClientDto} from './dto/create-key-client.dto';
import {UpdateKeyClientDto} from './dto/update-key-client.dto';
import {KeyClient} from './key-clients.entity';
import {KeyClientService} from './key-clients.service';

@ApiTags('KeyClient')
@ApiBearerAuth()
@Controller('key-client')
export class KeyClientController {
  constructor(private readonly keyClientService: KeyClientService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createkeyClient(@Body() createKeyClientDto: CreateKeyClientDto) {
    return await this.keyClientService.createkeyClient(createKeyClientDto);
  }

  @UseGuards(JWTAuthGuard)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateAwards(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateKeyClientDto: UpdateKeyClientDto,
  ) {
    return await this.keyClientService.updateKeyClient(id, updateKeyClientDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTAuthGuard)
  async deleteAwards(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    return await this.keyClientService.deleteKeyClient(id);
  }

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async getAwardsById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<KeyClient[]> {
    return await this.keyClientService.getKeyClientById(id);
  }
}
