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
import {Awards} from './awards.entity';
import {CreateAwardsDto} from './dto/create-adwards.dto';
import {UpdateAwardsDto} from './dto/update-awards.dto';

@Injectable()
export class AwardsService {
  constructor(
    @InjectRepository(Awards)
    private readonly awardsRepository: Repository<Awards>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createAwards(createAwardsDto: CreateAwardsDto, user: User) {
    try {
      const awards = new Awards();

      awards.awardsTitle = createAwardsDto.awardsTitle;
      awards.awardsWebsite = createAwardsDto.awardsWebsite;

      const team = await this.teamRepository.findOne({
        where: {id: createAwardsDto.teamId, user: {id: user.id}},
      });

      if (!team) {
        throw new HttpException('Cannot find team ID', HttpStatus.NOT_FOUND);
      }
      awards.team = team;

      const result = await this.awardsRepository.save(awards);

      return {
        awardsTitle: result.awardsTitle,
        awardsWebsite: result.awardsWebsite,
        teamId: awards.team.id,
        id: result.id,
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
      const team = await this.teamRepository.findOne({
        where: {id: updateAwardsDto.teamId},
      });

      if (!team) {
        throw new HttpException('Cannot find team ID', HttpStatus.NOT_FOUND);
      }

      const updateAwards = await this.awardsRepository.save({
        id: id,
        awardsTitle: updateAwardsDto.awardsTitle,
        awardsWebsite: updateAwardsDto.awardsWebsite,
        teamId: updateAwardsDto.teamId,
      });

      return {...updateAwards, teamId: team?.id};
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

  async getAwardsById(id: number) {
    const awards = await this.awardsRepository.find({
      where: {id: id},
      relations: ['team'],
    });

    if (awards && awards.length === 0) {
      throw new NotFoundException(`Awards with ID ${id} not found`);
    }

    return {
      awardsTitle: awards[0].awardsTitle,
      awardsWebsite: awards[0].awardsWebsite,
      teamId: awards[0].team?.id,
      id: awards[0].id,
    };
  }

  async getAllAwardsByTeamId(teamId: number): Promise<Awards[]> {
    return await this.awardsRepository.find({where: {team: teamId}});
  }
}
