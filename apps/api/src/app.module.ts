import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD, APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { HealthModule } from './health/health.module'
import { LeadsModule } from './leads/leads.module'
import { ContactModule } from './contact/contact.module'
import { NewsletterModule } from './newsletter/newsletter.module'
import { NotificationsModule } from './notifications/notifications.module'
import { loadConfig } from './config'

const isDev = process.env.NODE_ENV !== 'production'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: () => loadConfig(),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: isDev ? 'debug' : 'info',
        transport: isDev
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
        autoLogging: true,
      },
    }),
    // Global rate limit: 60 req / 15s per IP. Tight on mutation routes via per-route overrides.
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 15_000, limit: 60 },
    ]),
    PrismaModule,
    NotificationsModule,
    HealthModule,
    LeadsModule,
    ContactModule,
    NewsletterModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    // Belt-and-suspenders: global validation pipe also set in main.ts.
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
