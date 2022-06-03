import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Paging} from '@utils/commonDto';
import {formatPaging} from '@utils/formatter';
import {FindOneOptions, In, Like, Repository} from 'typeorm';
import {CreateSkillDto, GetListSkillDto} from './dto/skills.dto';
import {Skill} from './skills.entity';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
    ) {}

    async create(createSkillDto: CreateSkillDto): Promise<Skill | undefined> {
        const skill = new Skill(createSkillDto);
        const {skillName} = createSkillDto;

        if (!skillName)
            throw new BadRequestException('Skill should not be empty');

        const result = await this.findOne({
            where: {skillName},
        });
        if (result) throw new BadRequestException('Skill name already exists');

        return await this.skillRepository.save(skill);
    }

    async getList(queryData: GetListSkillDto): Promise<Paging<Skill>> {
        const {page, size, sort, keyword} = queryData;
        const paging = formatPaging(page, size, sort);

        let filter: any = {};
        if (keyword) filter['skillName'] = Like(`%${keyword}%`);

        const [list, total] = await this.skillRepository.findAndCount({
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

    async getSkillByIds(ids: Array<number>) {
        const skill = await this.skillRepository.find({where: {id: In(ids)}});
        return skill;
    }

    async findOne(where: FindOneOptions<Skill>) {
        const skill = await this.skillRepository.findOne(where);
        return skill;
    }

    async findOrCreate(skills: Skill[]):Promise<Skill[]> {
        let skillList = await Promise.all(skills.map(async (skill) => {
            const _skill = await this.findOne({where: [{id: skill.id}, {skillName: skill.skillName}]})
            if(_skill) return _skill

            return this.create({skillName: skill.skillName})
        }))
        return skillList.filter(Boolean) as Skill[]
    }
}
