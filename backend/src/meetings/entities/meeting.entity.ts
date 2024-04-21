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

@Entity({ name: 'meetings' })
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startTime: Date;

  @Column()
  duration: number;

  @OneToMany(() => Transcript, (transcript) => transcript.meeting)
  transcripts: Transcript[];

  @ManyToOne(() => Room)
  @JoinColumn()
  room: Room;
}
