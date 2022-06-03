import {Module} from '@nestjs/common';
import {SkillService} from './skills.service';
import {SkillController} from './skills.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Skill} from './skills.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Skill])],
    controllers: [SkillController],
    providers: [SkillService],
    exports: [SkillService],
})
export class SkillModule {}
