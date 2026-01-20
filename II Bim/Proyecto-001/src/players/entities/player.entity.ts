import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({ example: 'Lionel Messi' })
  name: string;

  @Column()
  @ApiProperty({ example: 30 })
  goalCount: number;

  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
  team: Team;
}
