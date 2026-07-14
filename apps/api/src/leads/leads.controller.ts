import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LeadsService } from './leads.service'
import { CreateLeadDto } from './dto/create-lead.dto'

@ApiTags('leads')
@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post()
  @HttpCode(201)
  // Tighter throttle on lead creation to deter spam.
  @Throttle({ short: { ttl: 60_000, limit: 5 } })
  @ApiOperation({ summary: 'Submit a free-trial / callback request' })
  async create(@Body() dto: CreateLeadDto) {
    // Honeypot: bots fill hidden fields; silently accept without saving.
    if (dto.website) {
      return { ok: true }
    }
    const lead = await this.leads.create(dto)
    return { ok: true, id: lead.id }
  }

  @Get()
  @ApiOperation({ summary: 'List recent leads (admin)' })
  findAll() {
    return this.leads.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single lead (admin)' })
  findOne(@Param('id') id: string) {
    return this.leads.findOne(id)
  }
}
