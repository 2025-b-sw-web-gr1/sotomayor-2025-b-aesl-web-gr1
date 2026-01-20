import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ example: 'Lionel Messi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @IsPositive()
  goalCount: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  teamId: number;
}
