import { Injectable } from '@nestjs/common';
import { CreateTranscriptDto } from './dto/create-transcript.dto';
import { UpdateTranscriptDto } from './dto/update-transcript.dto';

@Injectable()
export class TranscriptsService {
  create(createTranscriptDto: CreateTranscriptDto) {
    return 'This action adds a new transcript';
  }

  findAll() {
    return `This action returns all transcripts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transcript`;
  }

  update(id: number, updateTranscriptDto: UpdateTranscriptDto) {
    return `This action updates a #${id} transcript`;
  }

  remove(id: number) {
    return `This action removes a #${id} transcript`;
  }
}
