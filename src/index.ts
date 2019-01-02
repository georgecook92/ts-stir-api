import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as http from 'http'
import { api } from './v1'
import * as cors from 'cors'
import { createConnection } from 'typeorm';
import { db } from './config';

// bytes
const limit = 100000000

const app = express()
app.use(cookieParser('secret'))
app.use(bodyParser.json({
  limit
}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit
}))
app.use(cors())

app.use('/v1', api) // V1 API

createConnection(db.typeOrmConfig).then(() => {
  app.listen(3000, function () {
    console.log(`listening on port:${3000}`)
  })
})
