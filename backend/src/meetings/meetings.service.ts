import { Injectable } from '@nestjs/common';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
  ) {}

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return this.meetingRepository.update(
      { id },
      {
        duration: updateMeetingDto.duration,
        name: updateMeetingDto.name,
        startTime: updateMeetingDto.startTime,
      },
    );
  }

  remove(id: number) {
    return this.meetingRepository.delete({ id });
  }
}
