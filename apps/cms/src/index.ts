// Strapi bootstrap entry — runs on server start.
export default {
  /**
   * An asynchronous bootstrap function that runs before your app starts.
   * Use it to seed initial content or set up default roles/permissions.
   */
  register({ strapi }) {
    // Register hooks/plugins here if needed.
  },
  bootstrap({ strapi }) {
    // eslint-disable-next-line no-console
    console.log('🏋️ Anchor Strength CMS bootstrapped')
  },
}
