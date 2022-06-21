import {SkillDistribution} from '@/skill-distribution/skill-distribution.entity';
import {SkillDistributionService} from '@/skill-distribution/skill-distribution.service';
import {SkillService} from '@/skills/skills.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {Paging} from '@utils/commonDto';
import {formatPaging} from '@utils/formatter';
import {User} from '../user/user.entity';
import {createQueryBuilder} from '../utils/helper';
import {CreateTeamDto} from './dto/create-team.dto';
import {GetListTeamDto} from './dto/get-list-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {Team} from './team.entity';
import {GetListTeamPagingDto} from './dto/get-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly skillService: SkillService,
    private readonly skillDistributionService: SkillDistributionService,
  ) {}

  async createTeam(user: User, createTeamDto: CreateTeamDto) {
    try {
      const skills = await this.skillService.findOrCreate(
        createTeamDto.skills || [],
      );

      const skillDistributions = (await Promise.all(
        createTeamDto.skillDistribution?.map(
          async (skillDistribution) =>
            await this.skillDistributionService.create(skillDistribution),
        ) || [],
      )) as SkillDistribution[];

      const team = new Team({
        ...createTeamDto,
        user,
        skills,
        skillDistribution: skillDistributions,
      });

      await team.save();
      delete team.user;

      return {data: {...team}};
    } catch (error) {
      throw new NotFoundException('Error cannot create team');
    }
  }

  async updateTeam(id: number, updateTeamDto: UpdateTeamDto) {
    try {
      const team = await this.teamRepository.findOne(id);

      if (!team) {
        throw new NotFoundException(`There isn't any team with id: ${id}`);
      }

      const skills = await this.skillService.findOrCreate(
        updateTeamDto.skills || [],
      );

      const skillDistributions = await Promise.all(
        updateTeamDto.skillDistribution?.map(
          async (skillDistribution) =>
            await this.skillDistributionService.update(
              skillDistribution.id,
              skillDistribution,
            ),
        ) || [],
      );

      const updateTeam = await this.teamRepository.save({
        id: id,
        description: updateTeamDto.description,
        linkWebsite: updateTeamDto.linkWebsite,
        founded: updateTeamDto.founded,
        skillDistribution: skillDistributions,
        slogan: updateTeamDto.slogan,
        skills,
        teamName: updateTeamDto.teamName,
        teamSize: updateTeamDto.teamSize,
        projectSize: updateTeamDto.projectSize,
        timeZone: updateTeamDto.timeZone,
        workingTime: updateTeamDto.workingTime,
        saleEmail: updateTeamDto.saleEmail,
        imageUrl: updateTeamDto.imageUrl,
        status: updateTeamDto.status,
      });
      return {data: {...updateTeam}};
    } catch (error) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }

  async getAllTeam(): Promise<Team[]> {
    return await this.teamRepository.find({
      relations: [
        'skills',
        'skillDistribution',
        'portfolios',
        'awards',
        'keyClients',
      ],
    });
  }

  async getTeamById(id: number) {
    const getTeam = await this.teamRepository.findOne({
      where: {id: id},
      relations: [
        'skills',
        'skillDistribution',
        'portfolios',
        'awards',
        'keyClients',
        'user',
      ],
    });

    if (!getTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    const {user, ...data} = getTeam;
    return {data, userId: getTeam.user?.id};
  }

  async deleteTeam(id: number): Promise<void> {
    const result = await this.teamRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    throw new HttpException('Delete team success', HttpStatus.OK);
  }

  async setAvatar(id: number, imageUrl: string) {
    await this.teamRepository.update(id, {imageUrl: imageUrl});
  }

  async getList(queryData: GetListTeamDto): Promise<Paging<Team>> {
    const {keyword, skill_IN, timeZone_IN, page, size, sort} = queryData;

    const paging = formatPaging(page, size, sort);
    const queryBuilder = createQueryBuilder(this.teamRepository, 'team', {
      pageable: {page, size, sort},
      relations: ['skills'],
    });

    if (keyword) {
      queryBuilder.where(`"teamName" ilike :keyword`, {
        keyword: `%${keyword}%`,
      });
    }

    if (skill_IN) {
      queryBuilder.andWhere('skills.id IN(:...ids)', {ids: skill_IN});
    }

    if (timeZone_IN) {
      queryBuilder.andWhere(`"timeZone" IN(:...timeZone)`, {
        timeZone: timeZone_IN,
      });
    }

    const [list, total] = await queryBuilder.getManyAndCount();

    return {
      content: list,
      pageable: {
        total,
        ...paging.pageable,
      },
    };
  }

  async getAllTeamPagging(
    queryData: GetListTeamPagingDto,
  ): Promise<Paging<Team>> {
    const {page, size, sort, skillId, timeZone} = queryData;
    let filter: any = {};
    if (timeZone) filter['timeZone'] = Like(`%${timeZone}%`);

    let skills;
    if (typeof skills === 'string') {
      skills = [skillId];
    } else skills = skillId;

    const paging = formatPaging(page, size, sort);
    const queryBuilder = await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.skills', 'skills')
      .where('skills.id IN(:...ids', {ids: skills})
      .where('team.timeZone = :timeZone', {timeZone: timeZone})
      .take(paging.query.take)
      .skip(paging.query.skip);

    const [list, total] = await queryBuilder.getManyAndCount();

    return {
      content: list,
      pageable: {
        total,
        ...paging.pageable,
      },
    };
  }

  async findOne(where) {
    return await this.teamRepository.findOne(where);
  }

  async anyUserTeam({userId, teamId}) {
    return await this.teamRepository
      .createQueryBuilder('team')
      .where('"userId" = :userId', {userId})
      .andWhere('id = :teamId', {teamId})
      .getOne();
  }
}
