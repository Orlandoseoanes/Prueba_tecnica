import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDireccionDto {
  @ApiProperty({
    example: 'calle 7b#21-98',
    description: 'calle',
  })
  @IsString()
  calle: string;

  @ApiProperty({
    example: 'Valledupar',
    description: 'ciudad',
  })
  @IsString()
  ciudad: string;

  @ApiProperty({
    example: 'Colombia',
    description: 'País',
  })
  @IsString()
  pais: string;

  @ApiProperty({
    example: '20001',
    description: 'codigopostal',
  })
  @IsString()
  codigoPostal: string;
}
