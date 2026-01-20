import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty({ example: 'Barcelona FC' })
  name: string;

  @Column()
  @ApiProperty({ example: 'España' })
  country: string;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
