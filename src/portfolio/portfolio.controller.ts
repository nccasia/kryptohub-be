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
    ): Promise<Portfolio> {
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
    ): Promise<Portfolio> {
        return await this.portfolioService.updatePortfolio(
            id,
            updatePortfolioDto,
        );
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
}
