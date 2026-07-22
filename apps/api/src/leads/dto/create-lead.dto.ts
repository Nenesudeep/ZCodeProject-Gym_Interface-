import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsEnum,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator'

/**
 * Goals mirror the program catalogue so leads can be segmented by interest.
 * Keep in sync with the CMS program slugs / frontend goals list.
 */
export enum LeadGoal {
  GENERAL = 'general',
  WEIGHT_LOSS = 'weight-loss',
  CALISTHENICS = 'calisthenics',
  STRENGTH = 'strength',
  MMA = 'mma',
  GROUP_TRAINING = 'group-training',
}

/** Empty strings from HTML forms become undefined so `@IsOptional()` works. */
const emptyToUndefined = ({ value }: { value: unknown }) =>
  value === '' || value === null ? undefined : value

export class CreateLeadDto {
  @ApiProperty({ example: 'Sai Kumar', minLength: 2, maxLength: 100 })
  @IsString()
  @Length(2, 100)
  name!: string

  @ApiPropertyOptional({ example: 'sai@example.com' })
  @Transform(emptyToUndefined)
  @IsOptional()
  @IsEmail()
  @IsString()
  @MaxLength(254)
  email?: string

  @ApiProperty({
    example: '+91 93790 66066',
    description: 'Indian or international phone number.',
  })
  @IsString()
  @Matches(/^[+\d][\d\s-]{7,19}$/, {
    message: 'phone must be a valid phone number',
  })
  phone!: string

  @ApiPropertyOptional({
    enum: LeadGoal,
    default: LeadGoal.GENERAL,
  })
  @Transform(emptyToUndefined)
  @IsOptional()
  @IsEnum(LeadGoal)
  goal?: LeadGoal

  @ApiPropertyOptional({ example: 'calisthenics' })
  @Transform(emptyToUndefined)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  program?: string

  @ApiPropertyOptional({ example: 'I want to start next week.' })
  @Transform(emptyToUndefined)
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  message?: string

  @ApiPropertyOptional({
    description: 'Hidden honeypot field. Any value = bot submission.',
  })
  @Transform(emptyToUndefined)
  @IsOptional()
  @IsString()
  website?: string

  @ApiPropertyOptional({ description: 'Referrer / UTM source.' })
  @Transform(emptyToUndefined)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  source?: string
}
