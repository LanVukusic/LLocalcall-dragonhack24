import { Module } from '@nestjs/common';
import { TranscriptsService } from './transcripts.service';
import { TranscriptsController } from './transcripts.controller';
import { Transcript } from './entities/transcript.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Transcript])],
  controllers: [TranscriptsController],
  providers: [TranscriptsService],
})
export class TranscriptsModule {}
