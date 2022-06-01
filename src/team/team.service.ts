import {SkillDistribution} from '@/skill-distribution/skill-distribution.entity';
import {Skill} from '@/skills/skills.entity';
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
    ) {}
    async createTeam(
        createTeamDto: CreateTeamDto,
        user: User,
        // skill: Array<Skill>,
        skillDistribution: Array<SkillDistribution>,
    ) {
        const {
            teamName,
            teamSize,
            timeZone,
            workingTime,
            organization,
            hour,
            week,
            skills,
            avatarUrl,
            description,
            avatar,
            createAt,
            founded,
            linkWebsite,
            location,
            projectSize,
            slogan,
            status,
            updateAt,
        } = createTeamDto;

        const team = new Team();
        team.description = description;
        team.organization = organization;
        team.teamSize = teamSize;
        team.teamName = teamName;
        team.avatar = avatar;
        team.avatarUrl = avatarUrl;
        team.timeZone = timeZone;
        team.skills = skills;
        team.skillDistribution = skillDistribution;
        team.workingTime = workingTime;
        team.slogan = slogan;
        team.hour = hour;
        team.week = week;
        team.location = location;
        team.createAt = createAt;
        team.updateAt = updateAt;
        team.founded = founded;
        team.linkWebsite = linkWebsite;
        team.projectSize = projectSize;
        team.status = status;
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
