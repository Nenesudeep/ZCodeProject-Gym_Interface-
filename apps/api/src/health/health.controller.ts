import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { PrismaService } from '../prisma/prisma.service'

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Liveness probe' })
  liveness() {
    return { status: 'ok', timestamp: new Date().toISOString() }
  }

  @Get('ready')
  @ApiOperation({ summary: 'Readiness probe — checks DB connectivity' })
  async readiness() {
    try {
      await this.prisma.$queryRaw`SELECT 1`
      return { status: 'ok', database: 'up', timestamp: new Date().toISOString() }
    } catch (err) {
      return {
        status: 'degraded',
        database: 'down',
        error: err instanceof Error ? err.message : 'unknown',
        timestamp: new Date().toISOString(),
      }
    }
  }
}
