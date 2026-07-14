import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Prisma } from '@prisma/client'

/**
 * Uniform error shape for clients. Also keeps Prisma errors from leaking
 * internals (e.g. unique-constraint violations) — we map them to 4xx.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception')

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'
    let details: unknown = undefined

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const payload = exception.getResponse()
      message =
        typeof payload === 'string'
          ? payload
          : (payload as { message?: string }).message ?? exception.message
      details = typeof payload === 'object' ? payload : undefined
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 = unique constraint violation
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT
        message = 'That record already exists.'
      } else {
        status = HttpStatus.BAD_REQUEST
        message = 'Database validation error.'
      }
    } else if (exception instanceof Error) {
      message = exception.message
    }

    if (status >= 500) {
      this.logger.error(
        `${req.method} ${req.url} → ${status}`,
        exception instanceof Error ? exception.stack : undefined,
      )
    }

    res.status(status).json({
      statusCode: status,
      message,
      ...(details ? { details } : {}),
      timestamp: new Date().toISOString(),
      path: req.url,
    })
  }
}
