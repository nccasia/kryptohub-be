import {JWTAuthGuard} from '@/auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
  Put,
  ParseIntPipe,
  Delete,
  Res,
} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {HelperFile} from '@utils/helper';
import {diskStorage} from 'multer';
import {CreatePortfolioDto} from './dto/create-portfolio.dto';
import {UpdatePortfolioDto} from './dto/update-porfolio.dto';
import {Portfolio} from './portfolio.entity';
import {PortfolioService} from './portfolio.service';
import {Response} from 'express';
@ApiTags('Portfolio')
@ApiBearerAuth()
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createPorfolio(@Body() createPortfolioDto: CreatePortfolioDto) {
    return await this.portfolioService.createPortfolio(createPortfolioDto);
  }

  @UseGuards(JWTAuthGuard)
  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updatePortfolio(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    return await this.portfolioService.updatePortfolio(id, updatePortfolioDto);
  }

  @Get('getAll')
  @HttpCode(HttpStatus.OK)
  async getAllPortfolio(): Promise<Portfolio[]> {
    return await this.portfolioService.getAllPortfolio();
  }

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async getPortfolioById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Portfolio[]> {
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

  @Put('upload/:id/portfolio')
  @UseInterceptors(
    FileInterceptor('portfolio', {
      storage: diskStorage({
        destination: './upload/portfolio',
        filename: HelperFile.customFilename,
      }),
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  updateAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.portfolioService.updateAvatar(id, file.path, file.filename);
  }

  @Get('portfolio-image/:imageportfolio')
  findProfileImage(
    @Param('imagename') imagename: string,
    @Res() res: Response,
  ) {
    return res.sendFile(imagename, {
      root: './upload/portfolio',
    });
  }
}
