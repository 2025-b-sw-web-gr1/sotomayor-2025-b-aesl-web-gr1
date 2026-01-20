import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear equipo' })
  @ApiResponse({ status: 201, description: 'Equipo creado' })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  @ApiResponse({ status: 200, description: 'Lista de equipos' })
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener equipo por ID' })
  @ApiResponse({ status: 200, description: 'Equipo encontrado' })
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar equipo' })
  @ApiResponse({ status: 200, description: 'Equipo actualizado' })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar equipo' })
  @ApiResponse({ status: 200, description: 'Equipo eliminado' })
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }

  @Get(':id/players')
  @ApiOperation({ summary: 'Obtener jugadores de un equipo' })
  @ApiResponse({ status: 200, description: 'Lista de jugadores del equipo' })
  async findPlayers(@Param('id') id: string) {
    const team = await this.teamsService.findOne(+id);
    return team ? team.players : [];
  }
}
