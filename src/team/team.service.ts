import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {User} from '../user/user.entity';
import {formatPaging} from '../utils/formatter';
import {HelperFile} from '../utils/helper';
import {CreateTeamDto} from './dto/create-team.dto';
import {GetListTeamDto} from './dto/get-team.dto';
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
            avatarUrl,
        } = createTeamDto;
        const team = new Team();
        team.description = description;
        team.organization = organization;
        team.teamSize = teamSize;
        team.teamName = teamName;
        team.avatar = avatar;
        team.avatarUrl = avatarUrl;
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

    async getAllTeamPagging(queryData: GetListTeamDto) {
        const {page, size, sort, skillId, timeZone} = queryData;
        const paging = formatPaging(page, size, sort);
        let filter: any = {};
        if (timeZone) filter['timeZone'] = Like(`%${timeZone}%`);
        if (skillId) filter['skillId'] = {relations: ['skills']};

        const [list, total] = await this.teamRepository.findAndCount({
            where: filter,
            ...paging.query,
        });

        return {
            content: list,
            pagable: {
                total,
                ...paging.pagable,
            },
        };
    }
}
