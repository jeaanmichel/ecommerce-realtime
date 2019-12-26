'use strict'

const DB = use('Database')
const User = use('App/Models/User')
const Role = use('Role')

class AuthController {
    async register({ request, response }) {
        const transaction = await DB.beginTransaction()

        try {
            const { name, surname, email, password } = request.all()

            const user = await User.create({name, surname, email, password}, transaction)
            const clientRole = await Role.findBy('slug', 'customer')

            await user.roles().attach([clientRole.id], null, transaction)

            await transaction.commit()

            return response.status(201).send({data: user})

        } catch (error) {
            await transaction.rollback()
            return response.status(400).send({message: 'Erro ao realizar o cadastro!' + error})
        }    
    }

    async login({ request, response, auth }) {
        const { email, password } = request.all()

        let data = await auth.withRefreshToken().attempt(email, password)

        return response.send({data})
    }

    async refresh({ request, response, auth  }) {
        var refresh_token = request.input('refresh_token')

        if (!refresh_token) {
            refresh_token = request.header('refresh_token')
        }

        const user = await auth.newRefreshToken().generateForRefreshToken(refresh_token)

        return response.send({data: user})
    }

    async logout({ request, response, auth }) {
        let refresh_token = request.input('refresh_token')

        if (!refresh_token) {
            refresh_token = request.header('refresh_token')
        }

        // revokeTokens([tokensParaInvalidar], true ou false (padrão) para apagar o token da base de dados)
        await auth.authenticator('jwt').revokeTokens([refresh_token])

        return response.status(204).send({})
    }

    async forgot({ request, response }) {

    }

    async remember({ request, response }) {

    }

    async reset({ request, response }) {
        
    }
}

module.exports = AuthController
