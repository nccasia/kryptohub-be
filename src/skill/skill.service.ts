import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOneOptions, Repository} from 'typeorm';
import {User} from '../user/user.entity';
import {CreateSkillDto} from './dto/create-skill.dto';
import {UpdateSkillDto} from './dto/update-skill.dto';
import {Skill} from './entities/skill.entity';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
    ) {}

    async create(
        createSkillDto: CreateSkillDto,
        user: User,
    ): Promise<Skill | undefined> {
        const skill = new Skill();
        skill.skillId = createSkillDto.skillId;
        skill.skillName = createSkillDto.skillName;

        const result = await this.findOne({
            where: {skillName: skill.skillName},
        });

        if (skill.skillName == '') {
            throw new UnauthorizedException('Skill should not be empty');
        }

        if (result == null) {
            skill.skillId = createSkillDto.skillId;
            skill.skillName = createSkillDto.skillName;
            const saveSkill = await skill.save();
            return saveSkill;
        } else {
            throw new UnauthorizedException('skillname already exists');
        }
    }

    findAll() {
        return `This action returns all skill`;
    }

    async findOne(where: FindOneOptions<Skill>) {
        const skill = await this.skillRepository.findOne(where);

        return skill;
    }

    update(id: number, updateSkillDto: UpdateSkillDto) {
        return `This action updates a #${id} skill`;
    }

    remove(id: number) {
        return `This action removes a #${id} skill`;
    }
}

