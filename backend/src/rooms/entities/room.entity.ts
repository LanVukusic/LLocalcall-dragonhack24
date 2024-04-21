import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Users, () => Room, { nullable: false })
  @JoinColumn()
  createdBy: Users;

  @OneToMany(() => Meeting, (meeting) => meeting.room)
  meetings: Meeting[];
}
