import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min, IsString, IsNumber, IsAlpha } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({
    default: 10,
    description: 'The number of items to return',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 0,
    description:
      'The number of items to skip before starting to collect the result set',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @ApiProperty({
    description: 'Filter by edad (single value)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  edad?: number;


  @ApiProperty({
    description: 'Filter by calle (single value)',
    required: false,
  })
  @IsOptional()
  @IsString()
  calle?: string;

  @ApiProperty({
    description: 'Filter by pais (single value)',
    required: false,
  })
  @IsOptional()
  @IsString()
  pais?: string;

  @ApiProperty({
    description: 'Filter by ciudad (single value)',
    required: false,
  })
  @IsOptional()
  @IsString()
  ciudad?: string;



  
}