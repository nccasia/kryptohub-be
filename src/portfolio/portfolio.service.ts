import {Team} from '@/team/team.entity';
import {User} from '@/user/user.entity';
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
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createPortfolio(createPortfolioDto: CreatePortfolioDto, user: User) {
    try {
      const portfolio = new Portfolio({
        ...createPortfolioDto,
      });

      const team = await this.teamRepository.findOne({
        where: {id: createPortfolioDto.teamId, user: {id: user.id}},
      });

      if (!team) {
        throw new HttpException('Cannot find team ID', HttpStatus.NOT_FOUND);
      }
      portfolio.team = team;
      const result = await this.portfolioRepository.save(portfolio);
      return {
        id: result.id,
        companyName: result.companyName,
        imageUrl: result.imageUrl,
        videoLink: result.videoLink,
        content: result.content,
        clientWebsite: result.clientWebsite,
        title: result.title,
        category: result.category,
        estimate: result.estimate,
        startDate: result.startDate,
        endDate: result.endDate,
        description: result.description,
        privacy: result.privacy,
        teamId: portfolio.team.id,
        ...result
      };
    } catch (error) {
      throw new NotFoundException('Error cannot create portfolio');
    }
  }

  async createPorfolioOtherTeam(createPortfolioDto: CreatePortfolioDto){
    try {
      const portfolio = new Portfolio({
        ...createPortfolioDto,
      });
      const result = await this.portfolioRepository.save(portfolio);
      return {...result}
    } catch (error) {
      throw new NotFoundException('Error cannot create portfolio');
    }
  }

  async updatePortfolio(id, updatePortfolioDto: UpdatePortfolioDto) {
    try {
      const porfolio = await this.portfolioRepository.findOne(id);
      if (!porfolio) {
        throw new NotFoundException(`There isn't any portfolio with id: ${id}`);
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
      return {...updatePortfolio};
    } catch (error) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }
  }

  async getAllPortfolioByTeamId(teamId: number): Promise<Portfolio[]> {
    return await this.portfolioRepository.find({where: {team: teamId}});
  }

  async getPortfolioById(id: number) {
    const porfolio = await this.portfolioRepository.find({
      where: {id: id},
      relations: ['team'],
    });
    if (porfolio && porfolio.length === 0) {
      throw new NotFoundException(`Porfolio with ID ${id} not found`);
    }
    return {
      id: porfolio[0].id,
      category: porfolio[0].category,
      clientWebsite: porfolio[0].clientWebsite,
      companyName: porfolio[0].companyName,
      content: porfolio[0].content,
      description: porfolio[0].description,
      endDate: porfolio[0].endDate,
      estimate: porfolio[0].estimate,
      imageUrl: porfolio[0].imageUrl,
      videoLink: porfolio[0].videoLink,
      startDate: porfolio[0].startDate,
      title: porfolio[0].title,
      privacy: porfolio[0].privacy,
      // teamId: porfolio[0].team.id,
    };
  }

  async deletePortfolio(id: number): Promise<void> {
    const porfolio = await this.portfolioRepository.delete(id);
    if (porfolio.affected === 0) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }
    throw new HttpException('Delete portfolio success', HttpStatus.OK);
  }

  async setImage(id: number, imageUrl: string) {
    await this.portfolioRepository.update(id, {imageUrl: imageUrl});
  }
}
