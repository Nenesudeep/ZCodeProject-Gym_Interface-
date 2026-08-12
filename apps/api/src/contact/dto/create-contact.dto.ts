import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, Length, Matches, MaxLength } from 'class-validator'

export class CreateContactDto {
  @ApiProperty({ example: 'Priya Sharma' })
  @IsString()
  @Length(2, 100)
  name!: string

  @ApiProperty({ example: 'priya@example.com' })
  @IsEmail()
  email!: string

  @ApiPropertyOptional({ example: '+91 79894 58980' })
  @IsOptional()
  @IsString()
  @Matches(/^[+\d][\d\s-]{7,19}$/, {
    message: 'phone must be a valid phone number',
  })
  phone?: string

  @ApiPropertyOptional({ example: 'Partnership enquiry' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  subject?: string

  @ApiProperty({ example: 'Do you offer women-only batches?' })
  @IsString()
  @Length(5, 2000)
  message!: string

  @ApiPropertyOptional({ description: 'Honeypot field.' })
  @IsOptional()
  @IsString()
  website?: string
}
