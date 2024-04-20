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
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @OneToMany(() => Room, (room) => room.id)
  rooms: Room[];
}
