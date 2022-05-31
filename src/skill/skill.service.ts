import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Paging} from '@utils/commonDto';
import {formatPaging} from '@utils/formatter';
import {FindOneOptions, In, Like, Repository} from 'typeorm';
import {CreateSkillDto, GetListSkillDto} from './dto/skill.dto';
import {Skill} from './skill.entity';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
    ) {}

    async create(createSkillDto: CreateSkillDto): Promise<Skill | undefined> {
        const skill = new Skill();
        const {skillName} = createSkillDto;

        if (!skillName)
            throw new BadRequestException('Skill should not be empty');

        const result = await this.findOne({
            where: {skillName},
        });
        if (result) throw new BadRequestException('skillname already exists');

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
}

