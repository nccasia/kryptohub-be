import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOneOptions, In, Repository} from 'typeorm';
import {CreateSkillDistributionDto} from './dto/create-skill-distribution.dto';
import {SkillDistribution} from './skill-distribution.entity';

@Injectable()
export class SkillDistributionService {
    constructor(
        @InjectRepository(SkillDistribution)
        private readonly skillDistributionRepository: Repository<SkillDistribution>,
    ) {}

    async create(createSkillDistributionDto: CreateSkillDistributionDto) {
        const skillDistribution = new SkillDistribution();
        skillDistribution.skillDistributionName =
            createSkillDistributionDto.skillDistributionName;
        skillDistribution.skillDistributionValue = JSON.stringify(
            createSkillDistributionDto.skillDistributionValue,
        );

        if (skillDistribution.skillDistributionName == '') {
            throw new NotFoundException(
                'Skill distribution name should not be empty',
            );
        }

        const result = await this.skillDistributionRepository.findOne({
            where: {
                skillDistributionName: skillDistribution.skillDistributionName,
                skillDistributionValue:
                    skillDistribution.skillDistributionValue,
            },
        });

        if (result) {
            throw new NotFoundException(
                'Skill distribution name already exists',
            );
        }

        const saveSkillDistribution =
            await this.skillDistributionRepository.save(skillDistribution);

        return {
            ...saveSkillDistribution,
            skillDistributionValue: JSON.parse(
                saveSkillDistribution.skillDistributionValue || '',
            ),
        };
    }

    async getSkillDistributionById(id: Array<number>) {
        const skill = await this.skillDistributionRepository.find({
            where: {id: In(id)},
        });
        return skill;
    }

    async findOne(where: FindOneOptions<SkillDistribution>) {
        const skillDistribution =
            await this.skillDistributionRepository.findOne(where);
        return skillDistribution;
    }

    async update(id, data: SkillDistribution) {
        const skillDistribution = await this.skillDistributionRepository.findOne({id})
        if(!skillDistribution) return {}

        skillDistribution.team = data.team
        skillDistribution.skillDistributionName = data.skillDistributionName
        skillDistribution.skillDistributionValue = data.skillDistributionValue

        return await skillDistribution.save()
    }
}
