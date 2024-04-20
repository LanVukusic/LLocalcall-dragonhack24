import { Transcript } from 'src/transcripts/entities/transcript.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'meetings' })
export class Meeting {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  name: string;

  @Column()
  startTime: Date;

  @Column()
  duration: number;

  @OneToMany(() => Transcript, (transcript) => transcript.meeting)
  transcripts: Transcript[];
}
