import { Room } from 'src/rooms/entities/room.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum Service {
  GITLAB = 'gitlab',
  DISCORD = 'discord',
}

@Entity({ name: 'connectors' })
@Unique(['service', 'room'])
export class Connector {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({
    type: 'enum',
    enum: Service,
    nullable: true,
  })
  service?: Service;

  @OneToOne(() => Room)
  @JoinColumn()
  room: Room;

  @OneToOne(() => Users)
  @JoinColumn()
  createdBy: Users;
}
