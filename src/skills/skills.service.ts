import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Paging} from '@utils/commonDto';
import {formatPaging} from '@utils/formatter';
import {FindOneOptions, In, Repository} from 'typeorm';
import {CreateSkillDto, GetListSkillDto} from './dto/create-skills.dto';
import {UpdateSkillDto} from './dto/update-skill.dto';
import {Skill} from './skills.entity';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
    ) {}

    async create(createSkillDto: CreateSkillDto): Promise<Skill | undefined> {
        try {
            const skill = new Skill(createSkillDto);
            const {skillName} = createSkillDto;

            if (!skillName) {
                throw new BadRequestException('Skill should not be empty');
            }

            const result = await this.findOne({
                where: {skillName},
            });
            if (result) {
                throw new BadRequestException('Skill name already exists');
            }

            return await this.skillRepository.save(skill);
        } catch (error) {
            throw new NotFoundException('Error cannot create skill');
        }
    }

    async update(
        skillId: number,
        updatesSkill: UpdateSkillDto,
    ): Promise<Skill | undefined> {
        try {
            const skill = await this.skillRepository.findOne(skillId);

            if (!skill) {
                throw new NotFoundException(
                    `There isn't any skill with id: ${skillId}`,
                );
            }
            Object.assign(skill, updatesSkill);

            return await this.skillRepository.save(skill);
        } catch (error) {
            throw new NotFoundException(`Skill with ID ${skillId} not found`);
        }
    }

    async getList(queryData: GetListSkillDto): Promise<Paging<Skill>> {
        const {page, size, sort, keyword} = queryData;
        const paging = formatPaging(page, size, sort);

        const queryBuilder = this.skillRepository
            .createQueryBuilder('skill')
            .take(paging.query.take)
            .skip(paging.query.skip);

        if (keyword)
            queryBuilder.andWhere(`"skillName" ilike :skillName`, {
                skillName: keyword,
            });

        const [list, total] = await queryBuilder.getManyAndCount();

        return {
            content: list,
            pageable: {
                total,
                ...paging.pageable,
            },
        };
    }

    async delete(skillId: number): Promise<void> {
        const skill = await this.skillRepository.delete(skillId);
        if (skill.affected === 0) {
            throw new NotFoundException(`Skill with ID ${skillId} not found`);
        }
        throw new HttpException('Delete skill success', HttpStatus.OK);
    }

    async getSkillByIds(ids: Array<number>) {
        const skill = await this.skillRepository.find({where: {id: In(ids)}});
        return skill;
    }

    async getAllSkill(): Promise<Skill[]> {
        return await this.skillRepository.find();
    }

    async findOne(where: FindOneOptions<Skill>) {
        const skill = await this.skillRepository.findOne(where);
        return skill;
    }

    async findOrCreate(skills: Skill[]): Promise<Skill[]> {
        let skillList = await Promise.all(
            skills.map(async (skill) => {
                const _skill = await this.findOne({
                    where: [{id: skill.id}, {skillName: skill.skillName}],
                });
                if (_skill) return _skill;

                return this.create({skillName: skill.skillName});
            }),
        );
        return skillList.filter(Boolean) as Skill[];
    }
}
