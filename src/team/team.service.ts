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
import {PortfolioService} from '@/portfolio/portfolio.service';
import {KeyClientService} from '@/key-clients/key-clients.service';
import {KeyClient} from '@/key-clients/key-clients.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly skillService: SkillService,
    private readonly skillDistributionService: SkillDistributionService,
    private readonly keyClientsService: KeyClientService,
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

      const keyClients = (await Promise.all(
        createTeamDto.keyClients?.map(
          async (keyClient) =>
            await this.keyClientsService.createkeyClient(keyClient),
        ) || [],
      )) as KeyClient[];

      const team = new Team({
        ...createTeamDto,
        user,
        skills,
        skillDistribution: skillDistributions,
        keyClients: keyClients,
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

      const keyClients = await Promise.all(
        updateTeamDto.keyClients?.map(
          async (keyClient) =>
            await this.keyClientsService.updateKeyClient(
              keyClient.id,
              keyClient as any,
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
        keyClients: keyClients,
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
      relations: ['skills', 'skillDistribution', 'portfolios', 'keyClients'],
    });
  }

  async getTeamById(id: number): Promise<Team> {
    const getTeam = await this.teamRepository.findOne({
      where: {id: id},
      relations: ['skills', 'skillDistribution', 'portfolios', 'keyClients'],
    });

    if (!getTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return getTeam;
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
