import { Injectable } from '@nestjs/common';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transcript } from 'src/transcripts/entities/transcript.entity';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
    @InjectRepository(Transcript)
    private transcriptRepository: Repository<Transcript>,
  ) {}

  getTranscripts(id: number) {
    return this.transcriptRepository.find({ where: { meeting: { id } } });
  }

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
