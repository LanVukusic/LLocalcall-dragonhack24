import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transcripts' })
export class Transcript {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => Meeting)
  @JoinColumn()
  meeting: Meeting;
}
