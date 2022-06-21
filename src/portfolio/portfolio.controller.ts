import {JWTAuthGuard} from '@/auth/guards/jwt-auth.guard';
import {AuthUser} from '@/user/user.decorator';
import {User} from '@/user/user.entity';
import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
  Put,
  ParseIntPipe,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpException,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {editFileName, imageFileFilter} from '@utils/helper';
import {diskStorage} from 'multer';
import {CreatePortfolioDto} from './dto/create-portfolio.dto';
import {UpdatePortfolioDto} from './dto/update-porfolio.dto';
import {Portfolio} from './portfolio.entity';
import {PortfolioService} from './portfolio.service';
@ApiTags('Portfolio')
@ApiBearerAuth()
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createPorfolio(
    @Body() createPortfolioDto: CreatePortfolioDto,
    @AuthUser() user: User,
  ) {
    return await this.portfolioService.createPortfolio(
      createPortfolioDto,
      user,
    );
  }

  @UseGuards(JWTAuthGuard)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updatePortfolio(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return await this.portfolioService.updatePortfolio(id, updatePortfolioDto);
  }

  @Get('getAll/:teamId')
  @HttpCode(HttpStatus.OK)
  async getAllPortfolioByTeamId(
    @Param('teamId', new ParseIntPipe()) teamId: number,
  ): Promise<Portfolio[]> {
    return await this.portfolioService.getAllPortfolioByTeamId(teamId);
  }

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async getPortfolioById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.portfolioService.getPortfolioById(id);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTAuthGuard)
  async deletePortfolio(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    return await this.portfolioService.deletePortfolio(id);
  }

  @Post(':id/image')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/portfolio',

        filename: editFileName,
      }),
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: imageFileFilter,
    }),
  )
  async uploadImage(@Param('id') id, @UploadedFile() file) {
    try {
      await this.portfolioService.setImage(Number(id), file.filename);
      return {message: 'Upload file successful', imageUrl: file.filename};
    } catch (error) {
      throw new HttpException('Upload file failed', HttpStatus.OK);
    }
  }

  @Get('getImage/:imgpath')
  async seenImage(@Param('imgpath') imgpath, @Res() res): Promise<any> {
    res.sendFile(imgpath, {root: './upload/portfolio'});
  }
}
