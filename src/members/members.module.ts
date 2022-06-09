import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { TeamModule } from '@/team/team.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Member]), TeamModule, UserModule],
  providers: [MembersService],
  controllers: [MembersController]
})
export class MembersModule {}
