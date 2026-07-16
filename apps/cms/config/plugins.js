// Strapi plugins config. Local file upload provider for dev;
// swap to Cloudflare R2 / S3 in production via env vars.
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        localServer: {
          maxage: 300000,
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      // In production, set these to use S3/R2 instead:
      // provider: env('UPLOAD_PROVIDER', 'local'),
    },
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      jwtSecret: env('JWT_SECRET', 'dev-only-secret-change-me'),
    },
  },
})
