import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { User, TagCategory } from '../models'

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
    User,
    TagCategory
  ]
}

export { typeOrmConfig }