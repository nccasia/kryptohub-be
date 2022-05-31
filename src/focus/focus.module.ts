import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FocusController} from './focus.controller';
import {Focus} from './focus.entity';
import {FocusService} from './focus.service';

@Module({
    imports: [TypeOrmModule.forFeature([Focus])],
    controllers: [FocusController],
    providers: [FocusService],
    exports: [FocusService],
})
export class FocusModule {}
