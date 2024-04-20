import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
import { UserRequest } from 'src/common/auth-types';
import { CreateMeetingDto } from './dto/create-meeting.dto';

@Controller('rooms')
@ApiTags('Rooms')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  create(
    @Body() createRoomDto: CreateRoomDto,
    @Request() { sub }: UserRequest,
  ) {
    return this.roomsService.create(createRoomDto, +sub);
  }

  @ApiOperation({ summary: 'Returns all the rooms. No Auth.' })
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @ApiOperation({ summary: 'Get a room by id. No Auth.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a room by id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @ApiOperation({ summary: 'Delete a room by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }

  @ApiOperation({ summary: 'Get all meetings for a room' })
  @Get(':id/meetings')
  getMeetings(@Param('id') id: string) {
    return this.roomsService.getMeetings(+id);
  }

  @ApiOperation({ summary: 'Create a meeting for a room' })
  @Post(':id/meeting')
  createMeeting(
    @Param('id') id: string,
    @Body() createMeetingDto: CreateMeetingDto,
  ) {
    return this.roomsService.createMeeting(+id, createMeetingDto);
  }
}
