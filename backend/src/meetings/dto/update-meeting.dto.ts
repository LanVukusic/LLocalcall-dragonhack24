import { Status } from '../entities/meeting.entity';

export class UpdateMeetingDto {
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  name?: string;
  status: Status;
}
