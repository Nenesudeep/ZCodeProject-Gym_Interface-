import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { NotificationsService } from '../notifications/notifications.service'
import { CreateLeadDto, LeadGoal } from './dto/create-lead.dto'

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly notify: NotificationsService,
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        name: dto.name,
        email: dto.email ?? null,
        phone: dto.phone,
        goal: dto.goal ?? LeadGoal.GENERAL,
        program: dto.program ?? null,
        message: dto.message ?? null,
        source: dto.source ?? 'website',
      },
    })

    // Audit trail.
    await this.prisma.auditLog.create({
      data: { leadId: lead.id, action: 'created', to: 'new' },
    })

    // Fire-and-forget notification to staff.
    void this.notifyStaff(lead.name, lead.phone, lead.program, lead.message)

    this.logger.log(`New lead ${lead.id} from ${lead.phone}`)
    return lead
  }

  findAll() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
  }

  findOne(id: string) {
    return this.prisma.lead.findUnique({ where: { id } })
  }

  private notifyStaff(
    name: string,
    phone: string,
    program: string | null,
    message: string | null,
  ) {
    const subject = `🏋️ New free-trial lead: ${name}`
    const text = [
      `New lead from the website.`,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      program ? `Interested in: ${program}` : null,
      message ? `Message: ${message}` : null,
      ``,
      `Follow up quickly — speed-to-lead matters.`,
    ]
      .filter(Boolean)
      .join('\n')

    const html = `<pre style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;white-space:pre-wrap">${text}</pre>`

    return this.notify.sendInternalEmail({ subject, text, html })
  }
}
