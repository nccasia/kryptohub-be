import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOneOptions, In, Repository} from 'typeorm';
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

    async create(createSkillDto: CreateSkillDto): Promise<Skill | undefined> {
        const skill = new Skill();
        skill.id = createSkillDto.id;
        skill.skillName = createSkillDto.skillName;

        if (skill.skillName == '') {
            throw new UnauthorizedException('Skill should not be empty');
        }

        const result = await this.findOne({
            where: {skillName: skill.skillName},
        });

        if (result == null) {
            skill.id = createSkillDto.id;
            skill.skillName = createSkillDto.skillName;
            const saveSkill = await skill.save();
            return saveSkill;
        } else {
            throw new UnauthorizedException('skillname already exists');
        }
    }

    async findAll() {
        const skill = await this.skillRepository.find();

        return skill;
    }

    async getSkillByIds(ids: Array<number>) {
        const skill = await this.skillRepository.find({where: {id: In(ids)}});
        return skill;
    }

    async findOne(where: FindOneOptions<Skill>) {
        const skill = await this.skillRepository.findOne(where);
        return skill;
    }

    async finById(where: FindOneOptions<Skill>) {
        const skill = await this.skillRepository.findOne(where);

        if (!skill) {
            throw new NotFoundException(
                `There isn't any skill with identifier: ${where}`,
            );
        }
        return skill;
    }

    async update(skillId: number, updatesSkill: UpdateSkillDto) {
        const skill = await this.skillRepository.findOne(skillId);

        if (!skill) {
            throw new NotFoundException(
                `There isn't any skill with id: ${skillId}`,
            );
        }
        Object.assign(skill, updatesSkill);

        return await this.skillRepository.save(skill);
    }

    async remove(skillId: number) {
        await this.skillRepository.delete(skillId);
        throw new HttpException('Delete skill success', HttpStatus.OK);
    }
}
