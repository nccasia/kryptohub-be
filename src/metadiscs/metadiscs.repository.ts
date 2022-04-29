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
        return await this.save(createMetadiscDto);
    }

    public async editMetadisc(
        id: number,
        updateMetadiscDto: UpdateMetadiscDto,
    ): Promise<Metadisc | undefined> {
        const metadisc = await this.findOne(id);
        if (metadisc) {
            return await this.save({metadisc, ...updateMetadiscDto});
        }
    }

    public async destroy(id: number): Promise<void> {
        const product = await this.findOne(id);
        if (product) {
            await this.remove(product);
        }
    }
}
