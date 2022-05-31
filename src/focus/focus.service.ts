import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {CreateFocusDto} from './dto/create-focus.dto';
import {Focus} from './focus.entity';

@Injectable()
export class FocusService {
    constructor(
        @InjectRepository(Focus)
        private readonly focusRepository: Repository<Focus>,
    ) {}

    async create(createFocusDto: CreateFocusDto) {
        const focus = new Focus();
        focus.focusName = createFocusDto.focusName;
        focus.focusValue = JSON.stringify(createFocusDto.focusValue);

        if (focus.focusName == '') {
            throw new NotFoundException('Focus name should not be empty');
        }

        const result = await this.focusRepository.findOne({
            where: {focusName: focus.focusName, focusValue: focus.focusValue},
        });

        if (result) {
            throw new NotFoundException('Focus name already exists');
        }

        const saveFocus = await this.focusRepository.save(focus);

        return {
            ...saveFocus,
            focusValue: JSON.parse(saveFocus.focusValue || ''),
        };
    }

    async getFocusById(id: Array<number>) {
        const focus = await this.focusRepository.find({where: {id: In(id)}});
        return focus;
    }
}
