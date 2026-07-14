import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { NewsletterService } from './newsletter.service'
import { SubscribeDto } from './dto/subscribe.dto'

@ApiTags('newsletter')
@Controller('api/newsletter')
export class NewsletterController {
  constructor(private readonly newsletter: NewsletterService) {}

  @Post('subscribe')
  @HttpCode(200)
  @Throttle({ short: { ttl: 60_000, limit: 5 } })
  @ApiOperation({ summary: 'Subscribe an email to the newsletter' })
  async subscribe(@Body() dto: SubscribeDto) {
    if (dto.website) return { ok: true, subscribed: true } // honeypot
    return this.newsletter.subscribe(dto)
  }
}
