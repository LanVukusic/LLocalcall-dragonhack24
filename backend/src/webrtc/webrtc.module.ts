import { Module } from '@nestjs/common';
import { WebrtcGateway } from './webrtc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Transcript } from 'src/transcripts/entities/transcript.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Transcript, Meeting]), HttpModule],
  providers: [WebrtcGateway],
})
export class WebrtcModule {}
