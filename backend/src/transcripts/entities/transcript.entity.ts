import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transcripts' })
export class Transcript {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  text: string;

  @OneToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @OneToOne(() => Meeting)
  @JoinColumn()
  meeting: Meeting;
}
