import {Injectable} from '@nestjs/common';
import {User} from '../user/user.entity';
import {CreateTeamDto} from './dto/create-team.dto';
import {Team} from './team.entity';

@Injectable()
export class TeamService {
    async createTeam(createTeamDto: CreateTeamDto, user: User) {
        const {
            teamName,
            teamSize,
            timeZone,
            skill,
            workingTime,
            organization,
            description,
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
        team.user = user;

        await team.save();
        delete team.user;
        return team;
    }
}
