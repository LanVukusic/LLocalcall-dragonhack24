import { Module } from '@nestjs/common';
import { WebrtcGateway } from './webrtc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Transcript } from 'src/transcripts/entities/transcript.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Transcript])],
  providers: [WebrtcGateway],
})
export class WebrtcModule {}
