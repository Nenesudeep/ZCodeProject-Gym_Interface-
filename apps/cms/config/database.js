// Strapi database config. SQLite for dev (zero setup), Postgres in prod.
export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite')

  if (client === 'postgres') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST', '127.0.0.1'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'anchor_cms'),
          user: env('DATABASE_USERNAME', 'anchor'),
          password: env('DATABASE_PASSWORD', 'anchor'),
          ssl: env.bool('DATABASE_SSL', false) && { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true) },
        },
        pool: { min: 0, max: 10 },
      },
    }
  }

  // SQLite (default for local dev)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  }
}
