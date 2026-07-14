import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'

@ApiTags('contact')
@Controller('api/contact')
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Post()
  @HttpCode(201)
  @Throttle({ short: { ttl: 60_000, limit: 5 } })
  @ApiOperation({ summary: 'Submit a general contact message' })
  async create(@Body() dto: CreateContactDto) {
    if (dto.website) return { ok: true } // honeypot
    const msg = await this.contact.create(dto)
    return { ok: true, id: msg.id }
  }
}
