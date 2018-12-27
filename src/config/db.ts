import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import User from '../models/User'

const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: "",
  database: "stir",
  synchronize: true,
  logging: false,
  entities: [
    User
  ]
}

export { typeOrmConfig }