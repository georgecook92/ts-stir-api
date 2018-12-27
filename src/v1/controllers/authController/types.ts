import * as t from "io-ts"

export const LoginType = t.interface({
    email: t.string,
    password: t.string
});