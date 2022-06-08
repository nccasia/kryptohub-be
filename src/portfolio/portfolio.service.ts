import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreatePortfolioDto} from './dto/create-portfolio.dto';
import {UpdatePortfolioDto} from './dto/update-porfolio.dto';
import {Portfolio} from './portfolio.entity';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(Portfolio)
        private readonly portfolioRepository: Repository<Portfolio>,
    ) {}

    async createPortfolio(
        createPortfolioDto: CreatePortfolioDto,
    ): Promise<Portfolio> {
        try {
            const portfolio = new Portfolio();
            const payload = createPortfolioDto;
            portfolio.category = payload.category;
            portfolio.clientWebsite = payload.clientWebsite;
            portfolio.videoLink = payload.videoLink;
            portfolio.companyName = payload.companyName;
            portfolio.content = payload.content;
            portfolio.description = payload.description;
            portfolio.imageUrl = payload.imageUrl;
            portfolio.endDate = payload.endDate;
            portfolio.startDate = payload.startDate;
            portfolio.estimate = payload.estimate;
            portfolio.privacy = payload.privacy;
            portfolio.title = payload.title;

            return await portfolio.save();
        } catch (error) {
            throw new NotFoundException('Error cannot create portfolio');
        }
    }

    async updatePortfolio(
        id: number,
        updatePortfolioDto: UpdatePortfolioDto,
    ): Promise<Portfolio> {
        try {
            const porfolio = await this.portfolioRepository.findOne(id);
            if (!porfolio) {
                throw new NotFoundException(
                    `There isn't any portfolio with id: ${id}`,
                );
            }

            const updatePortfolio = await this.portfolioRepository.save({
                id: id,
                category: updatePortfolioDto.category,
                clientWebsite: updatePortfolioDto.clientWebsite,
                companyName: updatePortfolioDto.companyName,
                content: updatePortfolioDto.content,
                description: updatePortfolioDto.description,
                endDate: updatePortfolioDto.endDate,
                estimate: updatePortfolioDto.estimate,
                imageUrl: updatePortfolioDto.imageUrl,
                videoLink: updatePortfolioDto.videoLink,
                startDate: updatePortfolioDto.startDate,
                title: updatePortfolioDto.title,
                privacy: updatePortfolioDto.privacy,
            });
            return updatePortfolio;
        } catch (error) {
            throw new NotFoundException(`Portfolio with ID ${id} not found`);
        }
    }

    async getAllPortfolio(): Promise<Portfolio[]> {
        return await this.portfolioRepository.find();
    }

    async getPortfolioById(id: number): Promise<Portfolio[]> {
        const porfolio = await this.portfolioRepository.find({where: {id: id}});
        if (!porfolio) {
            throw new NotFoundException(`Porfolio with ID ${id} not found`);
        }
        return porfolio;
    }

    async deletePortfolio(id: number): Promise<void> {
        const porfolio = await this.portfolioRepository.delete(id);
        if (porfolio.affected === 0) {
            throw new NotFoundException(`Portfolio with ID ${id} not found`);
        }
        throw new HttpException('Delete portfolio success', HttpStatus.OK);
    }
}
