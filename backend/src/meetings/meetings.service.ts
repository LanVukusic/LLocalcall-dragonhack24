import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { summaryEp } from 'src/common/server';
import { Transcript } from 'src/transcripts/entities/transcript.entity';
import { Repository } from 'typeorm';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
    @InjectRepository(Transcript)
    private transcriptRepository: Repository<Transcript>,
    private readonly httpService: HttpService,
  ) {}

  // nestjs logger
  private logger = new Logger(MeetingsService.name);

  getTranscripts(id: number) {
    return this.transcriptRepository.find({ where: { meeting: { id } } });
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    const updated = await this.meetingRepository.update(
      { id },
      {
        duration: updateMeetingDto.duration,
        name: updateMeetingDto.name,
        startTime: updateMeetingDto.startTime,
        endTime: updateMeetingDto.endTime,
        status: updateMeetingDto.status,
      },
    );

    // Summarize the meeting
    if (updateMeetingDto.status === 'finished') {
      const transcripts = await this.transcriptRepository.find({
        where: { meeting: { id } },
      });

      const rawText = transcripts.map((t) => t.text).join(' ');

      // Promise version of the previous firstavalue

      const res: any = await firstValueFrom(
        this.httpService.post(summaryEp, { transcripts: rawText }),
      ).catch((error) => {
        this.logger.error('Error occurred:', error);
        if (error.response) {
          // Log the response data if available
          this.logger.error('Response data:', error.response.data);
        }
      });

      const summary = res.data.summary || 'No summary available';

      await this.meetingRepository.update(
        { id },
        {
          summary: summary,
        },
      );

      this.logger.log(
        `Summary for meeting ${id}: ${summary.splice(0, 100)}...`,
      );
      // cre
    }

    if (updated.affected === 0) {
      throw new Error('Meeting not found');
    }

    return updated;
  }

  remove(id: number) {
    return this.meetingRepository.delete({ id });
  }
}
