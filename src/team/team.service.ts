import {Injectable} from '@nestjs/common';
import {User} from '../user/user.entity';
import {CreateTeamDto} from './dto/create-team.dto';
import {Team} from './team.entity';

@Injectable()
export class TeamService {
    async createTeam(createTeamDto: CreateTeamDto, user: User) {
        const {
            teamName,
            quantity,
            timeZone,
            skill,
            workingTime,
            project,
            description,
            wallet,
        } = createTeamDto;
        const team = new Team();
        team.description = description;
        team.project = project;
        team.quantity = quantity;
        team.teamName = teamName;
        team.wallet = wallet;
        team.timeZone = timeZone;
        team.skill = skill;
        team.workingTime = workingTime;
        team.user = user;

        await team.save();
        delete team.user;
        return team;
    }
}
