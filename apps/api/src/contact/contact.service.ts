import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { NotificationsService } from '../notifications/notifications.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly notify: NotificationsService,
  ) {}

  async create(dto: CreateContactDto) {
    const msg = await this.prisma.contactMessage.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone ?? null,
        subject: dto.subject ?? null,
        message: dto.message,
      },
    })

    void this.notifyStaff(msg.name, msg.email, msg.subject, msg.message)
    this.logger.log(`New contact message ${msg.id} from ${msg.email}`)
    return msg
  }

  private notifyStaff(
    name: string,
    email: string,
    subject: string | null,
    message: string,
  ) {
    const subjectLine = subject
      ? `💬 Contact: ${subject} — ${name}`
      : `💬 Contact message — ${name}`

    const text = [
      `New message from the contact form.`,
      ``,
      `From: ${name} <${email}>`,
      subject ? `Subject: ${subject}` : null,
      ``,
      message,
    ]
      .filter(Boolean)
      .join('\n')

    return this.notify.sendInternalEmail({
      subject: subjectLine,
      text,
      html: `<pre style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
      replyTo: email,
    })
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
      character
    ]!,
  )
}
