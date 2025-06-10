import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  // Nome do produto
  name!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  // Preço do produto
  price!: number;

  @IsNotEmpty()
  @IsString()
  // Descrição curta do produto
  description!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  // Descrição longa do produto (array de parágrafos ou tópicos)
  long_description?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  // URLs das imagens do produto
  image_urls?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  // Avaliação média do produto (ex: 4.5)
  rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  // Quantidade de avaliações recebidas
  reviewCount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  // Lista de características ou diferenciais do produto
  features?: string[];

  @IsOptional()
  @IsBoolean()
  // Indica se o produto está disponível para compra
  isAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  // Indica se o produto possui frete grátis
  freeShipping?: boolean;

  @IsOptional()
  @IsString()
  // Prazo estimado de envio (ex: "3 a 5 dias úteis")
  shippingEstimate?: string;
}
