import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../user/user.entity';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {Team} from './team.entity';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) {}
    async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<Team> {
        const {
            teamName,
            teamSize,
            timeZone,
            skill,
            workingTime,
            organization,
            hour,
            week,
            description,
            userId,
            avatar,
        } = createTeamDto;
        const team = new Team();
        team.description = description;
        team.organization = organization;
        team.teamSize = teamSize;
        team.teamName = teamName;
        team.avatar = avatar;
        team.timeZone = timeZone;
        team.skill = skill;
        team.workingTime = workingTime;
        team.hour = hour;
        team.week = week;
        team.user = user;
        team.userId = userId;
        await team.save();
        delete team.user;
        return team;
    }

    async updateTeam(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
        await this.teamRepository.update(id, updateTeamDto);
        const result = await this.teamRepository.findOne(id);
        if (!result) {
            throw new NotFoundException(`Team with ID ${id} not found`);
        }
        return result;
    }

    async getAllTeam(): Promise<Team[]> {
        return await this.teamRepository.find();
    }

    async getTeamById(id: number): Promise<Team> {
        const getTeam = await this.teamRepository.findOne(id);

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
}
