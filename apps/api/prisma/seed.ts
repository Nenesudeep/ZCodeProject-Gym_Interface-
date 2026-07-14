import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Seed a few sample leads + audit log so the dashboard has data on first boot.
 * Idempotent-ish: re-running adds rows; for a clean reset use `prisma migrate reset`.
 */
async function main() {
  console.log('🌱 Seeding database…')

  const sampleLead = await prisma.lead.upsert({
    where: { id: 'seed-lead-1' },
    update: {},
    create: {
      id: 'seed-lead-1',
      name: 'Sample Lead',
      phone: '+91 90000 00000',
      email: 'sample@example.com',
      goal: 'calisthenics',
      program: 'calisthenics',
      message: 'Interested in a free trial.',
      source: 'website',
      status: 'new',
    },
  })

  await prisma.auditLog.upsert({
    where: { id: 'seed-audit-1' },
    update: {},
    create: {
      id: 'seed-audit-1',
      leadId: sampleLead.id,
      action: 'created',
      to: 'new',
    },
  })

  console.log(`✅ Seeded lead ${sampleLead.id}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
