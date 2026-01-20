import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear jugador' })
  @ApiResponse({ status: 201, description: 'Jugador creado' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los jugadores' })
  @ApiResponse({ status: 200, description: 'Lista de jugadores' })
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener jugador por ID' })
  @ApiResponse({ status: 200, description: 'Jugador encontrado' })
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar jugador' })
  @ApiResponse({ status: 200, description: 'Jugador actualizado' })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar jugador' })
  @ApiResponse({ status: 200, description: 'Jugador eliminado' })
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
