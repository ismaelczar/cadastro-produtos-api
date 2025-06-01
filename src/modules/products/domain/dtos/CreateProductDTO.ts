import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // cada item do array deve ser string
  long_description?: string[];
}
