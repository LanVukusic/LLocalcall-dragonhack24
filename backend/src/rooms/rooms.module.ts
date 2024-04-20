import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Users, Meeting])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
