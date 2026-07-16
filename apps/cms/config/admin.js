// Strapi admin panel config.
export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dev-only-secret-change-me'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'dev-only-salt-change-me'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'dev-only-salt-change-me'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
})
