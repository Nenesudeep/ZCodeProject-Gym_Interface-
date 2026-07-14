import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator'

export class SubscribeDto {
  @ApiProperty({ example: 'raj@example.com' })
  @IsEmail()
  email!: string

  @ApiPropertyOptional({ example: 'Raj' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  consent?: boolean

  @ApiPropertyOptional({ description: 'Honeypot field.' })
  @IsOptional()
  @IsString()
  website?: string
}
