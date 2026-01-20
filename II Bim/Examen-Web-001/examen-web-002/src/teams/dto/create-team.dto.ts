import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ example: 'Real Madrid', description: 'The name of the team' })
  name: string;

  @ApiProperty({ example: 'Spain', description: 'The country of the team' })
  country: string;
}
