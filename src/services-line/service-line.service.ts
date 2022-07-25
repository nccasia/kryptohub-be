import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateServiceLineDto } from "./dto/create-service-line.dto";
import { UpdateServiceLineDto } from "./dto/update-service-line.dto";
import { ServiceLine } from "./service-line.entity";

@Injectable()
export class ServiceLineService {
  constructor(
    @InjectRepository(ServiceLine)
    private readonly serviceLineRepository: Repository<ServiceLine>
  ) {}

  async createServiceLine(createServiceLineDto: CreateServiceLineDto){
    try {
      const serviceLine = new ServiceLine({...createServiceLineDto as any});
      const result = await this.serviceLineRepository.save(serviceLine);
      return {...result}
    } catch (error) {
      throw new HttpException(
        'Error cannot create service line',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateServiceLine(id, updateServiceLineDto: UpdateServiceLineDto){
    try {
      const keyClients = await this.serviceLineRepository.findOne(id);
      if (!keyClients) {
        throw new HttpException(
          `There isn't any service line with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updateServiceLine = await this.serviceLineRepository.save({
        id: id,
        name: updateServiceLineDto.name,
        value: updateServiceLineDto.value as any
      });
      return updateServiceLine;
    } catch (error) {
      throw new HttpException(
        `Service line with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteServiceLine(id: number): Promise<void> {
    const serviceLine = await this.serviceLineRepository.delete(id);
    if (serviceLine.affected === 0) {
      throw new NotFoundException(`Service line with ID ${id} not found`);
    }
    throw new HttpException('Delete service line successful', HttpStatus.OK);
  }

  async getServiceLineById(id: number): Promise<ServiceLine[]> {
    const serviceLine = await this.serviceLineRepository.find({where: {id: id}});
    if (!serviceLine) {
      throw new NotFoundException(`Service line with ID ${id} not found`);
    }
    return serviceLine;
  }

  async getAllServiceLine(): Promise<ServiceLine[]>{
    return await this.serviceLineRepository.find()
  }
}