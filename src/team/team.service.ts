import {SkillDistribution} from '@/skill-distribution/skill-distribution.entity';
import {SkillDistributionService} from '@/skill-distribution/skill-distribution.service';
import {Skill} from '@/skills/skills.entity';
import {SkillService} from '@/skills/skills.service';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Paging} from '@utils/commonDto';
import {formatPaging} from '@utils/formatter';
import {Repository} from 'typeorm';
import {User} from '../user/user.entity';
import {HelperFile} from '../utils/helper';
import {CreateTeamDto} from './dto/create-team.dto';
import {GetListTeamDto} from './dto/team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {Team} from './team.entity';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        private readonly skillService: SkillService,
        private readonly skillDistributionService: SkillDistributionService,
    ) {}
    async createTeam(user: User, createTeamDto: CreateTeamDto) {
        const skills = await this.skillService.findOrCreate(
            createTeamDto.skills || [],
        );

        const skillDistributions = (await Promise.all(
            createTeamDto.skillDistribution?.map(
                async (skillDistribution) =>
                    await this.skillDistributionService.update(
                        skillDistribution.id,
                        skillDistribution,
                    ),
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

        return team;
    }

    async updateTeam(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
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
            avatar: updateTeamDto.avatar,
            description: updateTeamDto.description,
            linkWebsite: updateTeamDto.linkWebsite,
            founded: updateTeamDto.founded,
            location: updateTeamDto.location,
            skillDistribution: skillDistributions,
            slogan: updateTeamDto.slogan,
            skills,
            teamName: updateTeamDto.teamName,
            teamSize: updateTeamDto.teamSize,
            projectSize: updateTeamDto.projectSize,
            timeZone: updateTeamDto.timeZone,
            workingTime: updateTeamDto.workingTime,
            week: updateTeamDto.week,
            hour: updateTeamDto.hour,
            organization: updateTeamDto.organization,
            avatarUrl: updateTeamDto.avatarUrl,
            status: updateTeamDto.status,
        });
        return updateTeam;
    }

    async getAllTeam(): Promise<Team[]> {
        return await this.teamRepository.find({
            relations: ['skills', 'skillDistribution'],
        });
    }

    async getTeamById(id: number): Promise<Team> {
        const getTeam = await this.teamRepository.findOne({
            where: {id: id},
            relations: ['skills', 'skillDistribution'],
        });

        if (!getTeam) {
            throw new NotFoundException(`Team with ID ${id} not found`);
        }
        return getTeam;
    }

    async deleteTeam(id: number): Promise<void> {
        const result = await this.teamRepository.delete({id});
        if (result.affected === 0) {
            throw new NotFoundException(`Team with ID ${id} not found`);
        }
    }

    async uploadAvatar(id: number, file: string, fileName: string) {
        const userAvatar = await this.teamRepository.findOne(id);

        if (userAvatar?.avatar === null || userAvatar?.avatar === '') {
            await this.teamRepository.update(id, {
                avatar: file,
                avatarUrl:
                    'http://localhost:3000' + '/team/profile-image/' + fileName,
            });
        } else {
            await HelperFile.removeFile(userAvatar?.avatar as string);

            await this.teamRepository.update(id, {
                avatar: file,
                avatarUrl:
                    'http://localhost:3000' + '/team/profile-image/' + fileName,
            });
        }
        const user = await this.teamRepository.findOne(id);
        return user;
    }

    async getList(queryData: GetListTeamDto): Promise<Paging<Team>> {
        const {keyword, skill_IN, page, size, sort} = queryData;

        const paging = formatPaging(page, size, sort);
        const queryBuilder = this.teamRepository
            .createQueryBuilder('team')
            .leftJoinAndSelect('team.skills', 'skills')
            .take(paging.query.take)
            .skip(paging.query.skip);

        if (keyword) {
            queryBuilder.where(`'teamName' like :keyword`, {
                keyword: `%${keyword}%`,
            });
        }

        if (skill_IN) {
            queryBuilder.andWhere('skills.id IN(:...ids)', {ids: skill_IN});
        }
        const [list, total] = await queryBuilder.getManyAndCount();

        return {
            content: list,
            pagable: {
                ...paging.pagable,
                total,
            },
        };
    }
}
