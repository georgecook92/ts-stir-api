import * as t from "io-ts"
import * as Joi from 'joi'

const EmailDecoder = new t.Type<string, string, string>(
    // name
    'EmailDecoder',
    // is
    t.string.is,
    // validate
    (s, c) => {
        const validation = Joi.validate(s, Joi.string().email().required())
        if (validation.error) {
            return t.failure(s, c)
        } else {
            return t.success(s)
        }
    },
    // encode  
    String
)

export const LoginType = t.interface({
    email: t.string,
    password: t.string
})

export const RegisterType = t.interface({
    firstName: t.string,
    lastName: t.string,
    email: EmailDecoder,
    password: t.string
})
