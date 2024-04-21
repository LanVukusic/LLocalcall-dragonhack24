import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { Meeting } from './entities/meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transcript } from 'src/transcripts/entities/transcript.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting, Transcript]), HttpModule],
  controllers: [MeetingsController],
  providers: [MeetingsService],
})
export class MeetingsModule {}
