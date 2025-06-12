import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
// import jwt from '@adonisjs/jwt/services/main'

export default class ApiAuthController {
    async register({ request, response }: HttpContext) {
        const data = request.all()
        const payload = await registerValidator.validate(data)
        const user = await User.create(payload)
        return response.created(user)
    }

    // async login({ request, response }: HttpContext) {
    //     const { email, password } = await request.validateUsing(loginValidator)
    //     const user = await User.verifyCredentials(email, password)
    //     const token = await jwt.generate(user)
    //     return response.ok({
    //         token,
    //         expires_in: '1d',
    //         type: 'Bearer',
    //     })
    // }

    // public async login({ request, auth }: HttpContext) {
    //     const { email, password } = request.only(['email', 'password'])
    //     const token = await auth.use('jwt').attempt(email, password)
    //     return token
    // }

    public async login({ request, auth }: HttpContext) {
        const data = request.all()
        const payload = await loginValidator.validate(data)
        const user = await User.verifyCredentials(payload.email, payload.password)
        return await auth.use('jwt').generate(user)

    }

    async profile({ auth, response }: HttpContext) {
        await auth.authenticate()
        return response.ok(auth.user)
    }
}
