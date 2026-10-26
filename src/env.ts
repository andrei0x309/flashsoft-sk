import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  SECRET_EMAIL_ID: { static: true },
  SECRET_EMAIL_KEY: { static: true },
  SECRET_SUPA_TOKEN: { static: true }
});
