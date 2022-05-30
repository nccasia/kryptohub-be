import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOneOptions, Repository} from 'typeorm';
import {User} from './user.entity';
import {UserUpdate} from './dto/user-update.dto';
import {JwtService} from '@nestjs/jwt';
import {Skill} from '../skill/entities/skill.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly skillRepository: Repository<Skill>,
        private readonly jwtService: JwtService,
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

    async update(id: number, updates: UserUpdate, skills: Array<Skill>) {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new NotFoundException(`There isn't any user with id: ${id}`);
        }

        const updateSkill = await this.userRepository.save({
            id: id,
            provider: user.provider,
            username: updates.username,
            company: updates.company,
            emailAddress: updates.emailAddress,
            githubAddress: updates.githubAddress,
            googleAddress: updates.googleAddress,
            avatarPath: updates.avatarPath,
            description: updates.description,
            status: updates.status,
            link: updates.link,
            location: updates.location,
            industry: updates.industry,
            headline: updates.headline,
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
}
