import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Awards} from './awards.entity';
import {CreateAwardsDto} from './dto/create-adwards.dto';
import {UpdateAwardsDto} from './dto/update-awards.dto';

@Injectable()
export class AwardsService {
  constructor(
    @InjectRepository(Awards)
    private readonly awardsRepository: Repository<Awards>,
  ) {}

  async createAwards(createAwardsDto: CreateAwardsDto) {
    try {
      const awards = new Awards({...createAwardsDto});
      const result = await this.awardsRepository.save(awards);
      return {
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        'Error cannot create awards',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateAwards(id, updateAwardsDto: UpdateAwardsDto) {
    try {
      const awards = await this.awardsRepository.findOne(id);
      if (!awards) {
        throw new HttpException(
          `There isn't any awards with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updateAwards = await this.awardsRepository.save({
        id: id,
        awardsTitle: updateAwardsDto.awardsTitle,
        awardsWebsite: updateAwardsDto.awardsWebsite,
      });

      return updateAwards;
    } catch (error) {
      throw new HttpException(
        `Awards with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteAwards(id: number): Promise<void> {
    const awards = await this.awardsRepository.delete(id);
    if (awards.affected === 0) {
      throw new NotFoundException(`Awards with ID ${id} not found`);
    }
    throw new HttpException('Delete awards successful', HttpStatus.OK);
  }

  async getAwardsById(id: number): Promise<Awards[]> {
    const awards = await this.awardsRepository.find({where: {id: id}});
    if (!awards) {
      throw new NotFoundException(`Awards with ID ${id} not found`);
    }
    return awards;
  }
}
