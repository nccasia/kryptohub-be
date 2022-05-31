import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {JWTAuthGuard} from '../auth/guards/jwt-auth.guard';
import {CreateFocusDto} from './dto/create-focus.dto';
import {Focus} from './focus.entity';
import {FocusService} from './focus.service';

@Controller('focus')
export class FocusController {
    constructor(private readonly focusService: FocusService) {}

    @Post('create')
    @UseGuards(JWTAuthGuard)
    async createFocus(@Body() createFocusDto: CreateFocusDto) {
        return this.focusService.create(createFocusDto);
    }
}
