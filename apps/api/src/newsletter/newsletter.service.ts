import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { SubscribeDto } from './dto/subscribe.dto'

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name)

  constructor(private readonly prisma: PrismaService) {}

  async subscribe(dto: SubscribeDto) {
    try {
      const sub = await this.prisma.newsletterSubscriber.upsert({
        where: { email: dto.email },
        update: { name: dto.name ?? undefined, active: true },
        create: {
          email: dto.email,
          name: dto.name ?? null,
          consent: dto.consent ?? true,
        },
      })
      this.logger.log(`Newsletter subscribe ${sub.email}`)
      return { ok: true, subscribed: true }
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Shouldn't happen due to upsert, but guard anyway.
        return { ok: true, subscribed: true }
      }
      throw err
    }
  }
}
