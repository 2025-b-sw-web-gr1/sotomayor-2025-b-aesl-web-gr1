import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { Team } from '../teams/entities/team.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const team = await this.teamsRepository.findOne({
      where: { id: createPlayerDto.teamId },
    });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    const player = this.playersRepository.create({
      ...createPlayerDto,
      team,
    });
    return this.playersRepository.save(player);
  }

  findAll() {
    return this.playersRepository.find({ relations: ['team'] });
  }

  findOne(id: number) {
    return this.playersRepository.findOne({
      where: { id },
      relations: ['team'],
    });
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.playersRepository.update(id, updatePlayerDto);
  }

  remove(id: number) {
    return this.playersRepository.delete(id);
  }
}
