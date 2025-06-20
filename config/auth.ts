import { defineConfig } from '@adonisjs/auth'
// import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import type { InferAuthenticators, InferAuthEvents, Authenticators } from '@adonisjs/auth/types'

import { sessionUserProvider } from '@adonisjs/auth/session'
import env from '#start/env'
import { JwtGuard } from '../app/auth/guards/jwt.js'
// import { JwtGuard } from '#app/auth/guards/jwt'

const jwtConfig = {
  secret: env.get('APP_KEY'),
}
const userProvider = sessionUserProvider({
  model: () => import('#models/user'),
})

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => {
      return new JwtGuard(ctx, userProvider, jwtConfig)
    },
  },
})

// const authConfig: AuthConfig = {
//   guard: 'api',
//   guards: {
//     api: {
//       driver: 'oat', // opaque access token (JWT alternative)
//       provider: {
//         driver: 'lucid',
//         identifierKey: 'id',
//         uids: ['email'],
//         model: () => import('#models/user'),
//       },
//     },
//   },
// }


export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}