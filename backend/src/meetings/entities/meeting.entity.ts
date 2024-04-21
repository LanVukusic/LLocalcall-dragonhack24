import { Room } from 'src/rooms/entities/room.entity';
import { Transcript } from 'src/transcripts/entities/transcript.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  LIVE = 'live',
  FINISHED = 'finished',
}

@Entity({ name: 'meetings' })
export class Meeting {
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.LIVE,
    nullable: false,
  })
  status: Status;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startTime: Date;

  @Column({
    nullable: true,
  })
  endTime?: Date;

  @Column()
  duration: number;

  @OneToMany(() => Transcript, (transcript) => transcript.meeting)
  transcripts: Transcript[];

  @ManyToOne(() => Room)
  @JoinColumn()
  room: Room;
}
