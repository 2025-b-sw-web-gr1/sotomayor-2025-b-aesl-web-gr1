import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  teamId: number;

  @ManyToOne(() => Team, (team) => team.players)
  @JoinColumn({ name: 'teamId' })
  team: Team;
}
