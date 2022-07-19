import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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
        const skillDistribution = new SkillDistribution(
            createSkillDistributionDto,
        );

        const saveSkillDistribution =
            await this.skillDistributionRepository.save(skillDistribution);

        return {
            ...saveSkillDistribution,
            skillDistributionValue:
                saveSkillDistribution.skillDistributionValue,
        };
    }

    async getSkillDistributionById(id: Array<number>) {
        const skill = await this.skillDistributionRepository.find({
            where: {id: In(id)},
        });
        return skill;
    }

    async getAllSkillDistribution(): Promise<SkillDistribution[]> {
        return await this.skillDistributionRepository.find();
    }

    async findOne(where: FindOneOptions<SkillDistribution>) {
        const skillDistribution =
            await this.skillDistributionRepository.findOne(where);
        return skillDistribution;
    }

    async update(id, data: SkillDistribution) {
        try {
            const skillDistribution =
                await this.skillDistributionRepository.findOne({id});
            if (!skillDistribution) {
                throw new NotFoundException(
                    `There isn't any skill with id: ${id}`,
                );
            }

            skillDistribution.skillDistributionName =
                data.skillDistributionName;
            skillDistribution.skillDistributionValue =
                data.skillDistributionValue;

            return await skillDistribution.save();
        } catch (error) {
            throw new NotFoundException(
                `Skill distribution with ID ${id} not found`,
            );
        }
    }

    async delete(id: number): Promise<void> {
        const result = await this.skillDistributionRepository.delete({id});
        if (result.affected === 0) {
            throw new NotFoundException(
                `Skill distribution with ID ${id} not found`,
            );
        }
        throw new HttpException(
            'Delete skill distribution success',
            HttpStatus.OK,
        );
    }
}
