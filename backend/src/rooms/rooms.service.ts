import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { Users } from 'src/users/users.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { Meeting } from 'src/meetings/entities/meeting.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) {}

  async create(createRoomDto: CreateRoomDto, userId: number) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    return this.roomRepository.save({
      name: createRoomDto.name,
      description: createRoomDto.description,
      createdBy: user,
    });
  }

  findAll() {
    return this.roomRepository.find();
  }

  findOne(id: number) {
    return this.roomRepository.findOneOrFail({ where: { id } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(
      { id },
      {
        description: updateRoomDto.description,
        name: updateRoomDto.name,
      },
    );
  }

  remove(id: number) {
    return this.roomRepository.delete({ id });
  }

  getMeetings(id: number) {
    return this.meetingRepository.find({ where: { room: { id } } });
  }

  createMeeting(id: number, createMeetingDto: CreateMeetingDto) {
    return this.meetingRepository.save({
      duration: createMeetingDto.duration,
      name: createMeetingDto.name,
      startTime: createMeetingDto.startTime,
      room: { id },
    });
  }
}
