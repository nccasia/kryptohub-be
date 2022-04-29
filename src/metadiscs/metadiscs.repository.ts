import {EntityRepository, Repository} from 'typeorm';
import {CreateMetadiscDto} from './dto/create-metadisc.dto';
import {UpdateMetadiscDto} from './dto/update-metadisc.dto';
import {Metadisc} from './entities/metadisc.entity';

@EntityRepository(Metadisc)
export class MetadiscsRepository extends Repository<Metadisc> {
    public async findAll(): Promise<Metadisc[]> {
        return await this.find({});
    }

    public async findById(id: number): Promise<Metadisc | undefined> {
        return await this.findOne(id);
    }

    public async createMetadisc(
        createMetadiscDto: CreateMetadiscDto,
    ): Promise<Metadisc> {
        const date = new Date().toISOString();
        return await this.save({
            ...createMetadiscDto,
            release_date: date,
            release_date_precision: date.toString(),
        });
    }

    public async updateMetadisc(
        id: number,
        updateMetadiscDto: UpdateMetadiscDto,
    ) {
        const metadisc = await this.findOne(id);
        if (metadisc) {
            return await this.update({id}, updateMetadiscDto);
        }
    }

    public async destroy(id: number): Promise<void> {
        const product = await this.findOne(id);
        if (product) {
            await this.remove(product);
        }
    }
}
