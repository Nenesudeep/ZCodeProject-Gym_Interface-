import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger as PinoLogger } from 'nestjs-pino'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { getConfig } from './config'
import { AllExceptionsFilter } from './all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  // Structured logging via pino.
  app.useLogger(app.get(PinoLogger))

  const config = getConfig()

  // Keep error responses consistent and avoid exposing internal failures.
  app.useGlobalFilters(new AllExceptionsFilter())

  // Security headers. loosen CSP so Swagger UI renders in dev.
  app.use(
    helmet({
      contentSecurityPolicy:
        config.nodeEnv === 'production' ? undefined : false,
    }),
  )

  // CORS — origins come from env as a comma-separated list.
  app.enableCors({
    origin: config.corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })

  // Global validation: strip unknown props, whitelist DTOs, fail fast.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  // Global API prefix keeps the surface tidy and versionable.
  app.setGlobalPrefix('api', { exclude: ['health'] })

  // Swagger / OpenAPI docs at /api/docs
  if (config.nodeEnv !== 'production' || config.enableSwaggerInProd) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Anchor Strength API')
      .setDescription('Lead capture, contact, and newsletter endpoints.')
      .setVersion('0.1.0')
      .addTag('leads')
      .addTag('contact')
      .addTag('newsletter')
      .addTag('health')
      .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api/docs', app, document)
  }

  await app.listen(config.port, '0.0.0.0')

  const logger = new Logger('bootstrap')
  logger.log(`🚀 API ready on http://localhost:${config.port}`)
  logger.log(`📘 Swagger at  http://localhost:${config.port}/api/docs`)
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap API', err)
  process.exit(1)
})
