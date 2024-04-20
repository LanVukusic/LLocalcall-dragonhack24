import { PartialType } from '@nestjs/swagger';
import { CreateTranscriptDto } from './create-transcript.dto';

export class UpdateTranscriptDto extends PartialType(CreateTranscriptDto) {}
