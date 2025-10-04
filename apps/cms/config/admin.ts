export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
        // The 'sessions' object replaces the deprecated 'options.expiresIn'
    sessions: {
      // maxSessionLifespan is the absolute maximum time a session can be valid for.
      // It is expressed in seconds. Default is 7 days.
      maxSessionLifespan: 60 * 60 * 24 * 7, // 7 days in seconds
      // maxRefreshTokenLifespan is the maximum time a refresh token can be used to get a new session.
      // It is expressed in seconds. Default is 30 days.
      maxRefreshTokenLifespan: 60 * 60 * 24 * 30, // 30 days in seconds
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
