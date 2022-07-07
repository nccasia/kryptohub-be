import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateKeyClientDto} from './dto/create-key-client.dto';
import {UpdateKeyClientDto} from './dto/update-key-client.dto';
import {KeyClient} from './key-clients.entity';

@Injectable()
export class KeyClientService {
  constructor(
    @InjectRepository(KeyClient)
    private readonly keyClientRepository: Repository<KeyClient>,
  ) {}

  async createkeyClient(createKeyClientDto: CreateKeyClientDto) {
    try {
      const keyClients = new KeyClient(createKeyClientDto as any);

      const result = await this.keyClientRepository.save(keyClients);
      return {
        ...result
      };
    } catch (error) {
      throw new HttpException(
        'Error cannot create key client',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateKeyClient(id, updateKeyClientDto: UpdateKeyClientDto) {
    try {
      const keyClients = await this.keyClientRepository.findOne(id);
      if (!keyClients) {
        throw new HttpException(
          `There isn't any key client with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updateKeyClient = await this.keyClientRepository.save({
        id: id,
        keyName: updateKeyClientDto.keyName as any,
      });
      return updateKeyClient;
    } catch (error) {
      throw new HttpException(
        `Key client with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteKeyClient(id: number): Promise<void> {
    const keyClients = await this.keyClientRepository.delete(id);
    if (keyClients.affected === 0) {
      throw new NotFoundException(`Awards with ID ${id} not found`);
    }
    throw new HttpException('Delete key client successful', HttpStatus.OK);
  }

  async getKeyClientById(id: number): Promise<KeyClient[]> {
    const keyClients = await this.keyClientRepository.find({where: {id: id}});
    if (!keyClients) {
      throw new NotFoundException(`Key client with ID ${id} not found`);
    }
    return keyClients;
  }
}
