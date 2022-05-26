import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {TeamService} from './team.service';
import {Team} from './team.entity';
import {getRepositoryToken} from '@nestjs/typeorm';

const mockTeam = {
    id: 1,
    teamName: 'abffffc',
    teamSize: '124',
    timeZone: '234',
    organization: 'lfkf',
    skill: ['1122', 'bbb'],
    workingTime: '44',
    hour: '2',
    week: '7',
    description: 'fjf',
    avatar: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',
    userId: 1,
};

const mockTeamRepository = () => ({
    createTeam: jest.fn(),
    updateTeam: jest.fn(),
    getAllTeam: jest.fn(),
    getTeamById: jest.fn(),
    deleteTeam: jest.fn(),
});

describe('TeamService', () => {
    let teamService;
    let teamRepository: Repository<Team>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TeamService,
                {
                    useFactory: mockTeamRepository,
                    provide: getRepositoryToken(Team),
                },
            ],
        }).compile();

        teamService = await module.get<TeamService>(TeamService);
        teamRepository = await module.get<Repository<Team>>(
            getRepositoryToken(Team),
        );
    });

    describe('createTeam', () => {
        it('Should create a team successfully', async () => {
            teamService.createTeam.mockResolvedValue('abc');

            expect(teamRepository.create).not.toHaveBeenCalled();
            const createTeamDto = {
                teamName: 'abffffc',
                teamSize: '124',
                timeZone: '234',
                description: 'fjf',
                organization: 'lfkf',
                hour: '2',
                week: '7',
                skill: ['abc', 'bbb'],
                avatar: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',
                workingTime: '44',
            };

            const result = await teamService.createTeam(
                createTeamDto,
                mockTeam,
            );
            expect(teamService.createTeam).toHaveBeenCalledWith(
                createTeamDto,
                mockTeam,
            );
            expect(result).toEqual('abc');
        });
    });

    describe('updateTeam', () => {
        it('Should update a team successfully', async () => {
            const save = jest.fn().mockResolvedValue(true);

            teamService.getTeamById = jest.fn().mockResolvedValue(save);
            expect(teamService.getTeamById).not.toHaveBeenCalled();
            expect(save).not.toHaveBeenCalled();
            expect(teamService.getTeamById).toHaveBeenCalled();
            expect(save).toHaveBeenCalled();
        });
    });

    describe('deleteTeam', () => {
        it('Should delete a team successfully', async () => {
            const save = jest.fn().mockResolvedValue(true);

            teamService.getTeamById = jest.fn().mockResolvedValue(save);
            expect(teamService.getTeamById).not.toHaveBeenCalled();
            expect(save).not.toHaveBeenCalled();
            expect(teamService.getTeamById).toHaveBeenCalled();
            expect(save).toHaveBeenCalled();
        });
    });
});
