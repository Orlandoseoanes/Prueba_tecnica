import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateDireccionDto } from './interfaces/direccion.dto';
import { Type } from 'class-transformer';
export class CreateUsuarioDto {
  @ApiProperty({
    example: 'orlando seoanes',
    description: 'Nombre del usuario',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'oseoanesdeveloper@gmail.com',
    description: 'Correo del usuario',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 22,
    description: 'Edad del usuario',
  })
  @IsNumber()
  @IsOptional()
  edad: number;

  @ApiProperty({
    description: 'Lista de direcciones del usuario',
    type: CreateDireccionDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDireccionDto)
  direcciones?: CreateDireccionDto[];
}
function IsUnique(): (target: CreateUsuarioDto, propertyKey: "email") => void {
  throw new Error('Function not implemented.');
}

