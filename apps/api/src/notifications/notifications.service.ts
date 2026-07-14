import { Injectable, Logger } from '@nestjs/common'
import { Resend } from 'resend'
import { getConfig } from '../config'

/**
 * Centralised notification dispatch.
 * - Email: via Resend in prod, console-logged in dev (or Mailpit relay).
 * - WhatsApp: click-to-chat links surfaced back to the UI, no paid API.
 *
 * Both are best-effort and swallow transport errors so a lead is never lost
 * because an email failed to send.
 */
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name)
  private readonly config = getConfig()
  private readonly resend: Resend | null

  constructor() {
    this.resend = this.config.resendApiKey
      ? new Resend(this.config.resendApiKey)
      : null
  }

  /** Send an internal notification email to the gym staff. */
  async sendInternalEmail(args: {
    subject: string
    html: string
    text: string
    replyTo?: string
  }): Promise<void> {
    if (!this.resend) {
      // Dev fallback: log so we can see content without a mail provider.
      this.logger.debug(
        `[email:dev-only]\nTo: ${this.config.emailTo.join(', ')}\nSubject: ${args.subject}\n${args.text}`,
      )
      return
    }

    try {
      const { error } = await this.resend.emails.send({
        from: this.config.emailFrom,
        to: this.config.emailTo,
        subject: args.subject,
        html: args.html,
        text: args.text,
        replyTo: args.replyTo,
      })
      if (error) this.logger.error(`Resend error: ${error.message}`)
    } catch (err) {
      this.logger.error(
        `Failed to send email "${args.subject}": ${err instanceof Error ? err.message : String(err)}`,
      )
    }
  }

  /**
   * Build a WhatsApp click-to-chat URL pre-filled with a message.
   * `phone` should be digits only with country code, no `+`.
   */
  whatsappLink(phone: string, message: string): string {
    const normalized = phone.replace(/[^\d]/g, '')
    return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
  }
}
