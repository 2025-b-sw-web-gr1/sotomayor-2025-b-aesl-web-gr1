import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    const team = this.teamsRepository.create(createTeamDto);
    return this.teamsRepository.save(team);
  }

  findAll() {
    return this.teamsRepository.find({ relations: ['players'] });
  }

  findOne(id: number) {
    return this.teamsRepository.findOne({
      where: { id },
      relations: ['players'],
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamsRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this.teamsRepository.delete(id);
  }
}
