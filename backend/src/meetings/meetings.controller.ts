import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsService } from './meetings.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Meetings')
@Controller('meetings')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @ApiOperation({ summary: 'Update a meeting by id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingsService.update(+id, updateMeetingDto);
  }

  @ApiOperation({ summary: 'Delete a meeting by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingsService.remove(+id);
  }

  @ApiOperation({ summary: 'Get all transcripts for a meeting' })
  @Get(':id/transcripts')
  getTranscripts(@Param('id') id: string) {
    return this.meetingsService.getTranscripts(+id);
  }

  @ApiOperation({ summary: 'Get one meeting by id with more details' })
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.meetingsService.getOne(+id);
  }
}
