import * as t from "io-ts"
import * as joi from 'joi'

export const LoginType = t.interface({
    email: t.string,
    password: t.string
})

export const RegisterType = t.interface({
    firstName: t.string,
    lastName: t.string,
    email: t.string,
    password: t.string
})

export const RegisterJoiTypes = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
})