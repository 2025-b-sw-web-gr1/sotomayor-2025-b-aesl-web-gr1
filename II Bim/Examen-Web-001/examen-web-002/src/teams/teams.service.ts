import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    const team = this.teamRepository.create(createTeamDto);
    return this.teamRepository.save(team);
  }

  findAll() {
    return this.teamRepository.find();
  }

  findOne(id: number) {
    return this.teamRepository.findOneBy({ id });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this.teamRepository.delete(id);
  }

  async findPlayers(id: number) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['players'],
    });
    return team ? team.players : [];
  }
}
