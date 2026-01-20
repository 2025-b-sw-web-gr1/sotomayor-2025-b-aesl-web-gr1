import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Barcelona FC' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'España' })
  @IsString()
  @IsNotEmpty()
  country: string;
}
