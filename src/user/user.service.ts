import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOneOptions, Repository} from 'typeorm';
import {User} from './user.entity';
import {UserUpdate} from './dto/user-update.dto';
import {JwtService} from '@nestjs/jwt';
import {SkillService} from '@/skills/skills.service';
import {TeamService} from '@/team/team.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly skillService: SkillService,
    private readonly jwtService: JwtService,
    private readonly teamService: TeamService,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    return this.userRepository.save(new User(data));
  }

  async findOne(where: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(where);

    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${where}`,
      );
    }

    return user;
  }

  async any(where: FindOneOptions<User>) {
    const user = await this.userRepository.findOne(where);

    return user;
  }

  async getSkillById(id: number) {
    return await this.userRepository.findOne(id, {
      relations: ['skills'],
    });
  }

  async getProfileMyTeam(id: number) {
    return await this.userRepository.findOne(id, {
      relations: ['team'],
    });
  }

  async update(id: number, updates: UserUpdate) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }

    const skills = await this.skillService.findOrCreate(updates.skills || []);

    const updateSkill = await this.userRepository.save({
      id: id,
      provider: user.provider,
      username: updates.username,
      emailAddress: updates.emailAddress,
      githubAddress: updates.githubAddress,
      googleAddress: updates.googleAddress,
      avatarPath: updates.avatarPath,
      status: updates.status,
      skills: skills,
    });

    const payload = {username: user.username, sub: user.emailAddress};
    return {
      accessToken: this.jwtService.sign(payload),
      user: updateSkill,
    };
  }

  async getSkillByUserId(id: number) {
    const skill = await this.userRepository.find({where: {id: id}});
    return skill;
  }

  async checkExistEmail(emailAddress: any) {
    const result = await this.any({
      where: [{emailAddress: emailAddress}],
    });

    if (result != null) {
      return {message: 'This email already exists'};
    }
  }

  async setImage(id: number, avatarUrl: string) {
    await this.userRepository.update(id, {avatarPath: avatarUrl});
  }

  async getShortList(authUser: User) {
    if (!authUser.id) return new BadRequestException('Not found');
    const user = await this.getSkillById(authUser.id);
    if (!user) return new BadRequestException('Not found');

    if (!user.shortList || user.shortList.length === 0) return [];
    const shortListTeam = await this.teamService.getShortListTeam(
      user.shortList,
    );
    return shortListTeam;
  }

  async addShortList(authUser: User, teamId: number) {
    const team = await this.teamService.findOne({where: {id: teamId}});
    if (!team) throw new NotFoundException('Team not found');

    const user = await this.findOne({where: {id: authUser.id}});
    const shortList = new Set(user.shortList);
    shortList.add(teamId);
    user.shortList = Array.from(shortList);

    const result = await this.userRepository.save({
      ...user,
      shortList: user.shortList,
    });
    return result;
  }

  async removeShortList(authUser: User, teamId: number) {
    const team = await this.teamService.findOne({where: {id: teamId}});
    if (!team) throw new NotFoundException('Team not found');

    const user = await this.findOne({where: {id: authUser.id}});
    user.shortList = user.shortList?.filter((e) => e * 1 !== teamId * 1);
    const result = await this.userRepository.save({
      ...user,
      shortList: user.shortList,
    });
    return result;
  }

  async removeAllShortList(authUser: User) {
    const user = await this.findOne({where: {id: authUser.id}});
    if (user) {
      user.shortList = Object();
      await this.userRepository.save(user);
      throw new HttpException('Delete all short lists success', HttpStatus.OK);
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
