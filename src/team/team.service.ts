import {SkillDistribution} from '@/skill-distribution/skill-distribution.entity';
import {Skill} from '@/skills/skills.entity';
import {SkillService} from '@/skills/skills.service';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../user/user.entity';
import {HelperFile} from '../utils/helper';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {Team} from './team.entity';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        private readonly skillService: SkillService,
    ) {}
    async createTeam(
        createTeamDto: CreateTeamDto,
        user: User,
        skillDistribution: Array<SkillDistribution>,
    ) {
        const payload = createTeamDto;
        const team = new Team();

        let skills = (await Promise.all(
            payload.skills?.map(async (skill: Skill) => {
                try {
                    return await this.skillService.create({
                        skillName: skill.skillName,
                    });
                } catch {
                    return undefined;
                }
            }) || [],
        )) as Skill[];
        skills = skills.filter(Boolean);
        skills = [
            ...skills,
            ...(payload.skills?.filter((skill) => !!skill.id) || []),
        ];

        team.description = payload.description;
        team.organization = payload.organization;
        team.teamSize = payload.teamSize;
        team.teamName = payload.teamName;
        team.avatar = payload.avatar;
        team.avatarUrl = payload.avatarUrl;
        team.timeZone = payload.timeZone;
        team.skills = skills;
        team.skillDistribution = skillDistribution;
        team.workingTime = payload.workingTime;
        team.slogan = payload.slogan;
        team.hour = payload.hour;
        team.week = payload.week;
        team.location = payload.location;
        team.founded = payload.founded;
        team.linkWebsite = payload.linkWebsite;
        team.projectSize = payload.projectSize;
        team.status = payload.status;
        team.user = user;
        await team.save();
        delete team.user;

        return team;
    }

    async updateTeam(
        id: number,
        updateTeamDto: UpdateTeamDto,
        // skills: Array<Skill>,
        skillDistribution: Array<SkillDistribution>,
    ): Promise<Team> {
        const team = await this.teamRepository.findOne(id);

        if (!team) {
            throw new NotFoundException(`There isn't any team with id: ${id}`);
        }

        const updateTeam = await this.teamRepository.save({
            id: id,
            avatar: updateTeamDto.avatar,
            description: updateTeamDto.description,
            linkWebsite: updateTeamDto.linkWebsite,
            founded: updateTeamDto.founded,
            location: updateTeamDto.location,
            skillDistribution: skillDistribution,
            slogan: updateTeamDto.slogan,
            skills: updateTeamDto.skills,
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
}
