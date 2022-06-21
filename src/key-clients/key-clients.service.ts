import {Team} from '@/team/team.entity';
import {User} from '@/user/user.entity';
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
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createkeyClient(createKeyClientDto: CreateKeyClientDto, user: User) {
    try {
      const keyClients = new KeyClient(createKeyClientDto as any);

      const team = await this.teamRepository.findOne({
        where: {id: createKeyClientDto.teamId, user: {id: user.id}},
      });

      if (!team) {
        throw new HttpException('Cannot find team ID', HttpStatus.NOT_FOUND);
      }

      keyClients.team = team as any;

      const result = await this.keyClientRepository.save(keyClients);
      return {
        id: result.id,
        keyName: result.keyName,
        teamId: keyClients.team.id,
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

      const team = await this.teamRepository.findOne({
        where: {id: updateKeyClientDto.teamId},
      });

      if (!team) {
        throw new HttpException('Cannot find team ID', HttpStatus.NOT_FOUND);
      }

      const updateKeyClient = await this.keyClientRepository.save({
        id: id,
        keyName: updateKeyClientDto.keyName as any,
        teamId: updateKeyClientDto.teamId,
      });
      return {...updateKeyClient, teamId: team.id};
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

  async getKeyClientById(id: number) {
    const keyClients = await this.keyClientRepository.find({
      where: {id: id},
      relations: ['team'],
    });
    if (!keyClients) {
      throw new NotFoundException(`Key client with ID ${id} not found`);
    }
    return {
      id: keyClients[0].id,
      keyName: keyClients[0].keyName,
      teamId: keyClients[0].team.id,
    };
  }
}
