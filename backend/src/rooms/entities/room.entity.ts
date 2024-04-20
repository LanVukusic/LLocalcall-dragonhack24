import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => Users, () => Room, { nullable: false })
  @JoinColumn()
  createdBy: Users;

  @OneToMany(() => Meeting, (meeting) => meeting.room)
  meetings: Meeting[];
}
