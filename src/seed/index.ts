import 'reflect-metadata';

import { createConnection, Repository } from 'typeorm'
import * as bcryptjs from 'bcryptjs'
import { db } from '../config'
import { User } from '../models'

const hashedPassword = bcryptjs.hashSync('Ch4ngeme', 10)

const users: User[] = [
  { firstName: 'George', lastName: 'Cook', email: 'georgecook406@gmail.com', password: hashedPassword },
  { firstName: 'Rhea', lastName: 'Chowdhury', email: 'eahrc94@gmail.com', password: hashedPassword }
]

const seedData = async () => {
  console.log('BEGIN SEED')
  const conn = await createConnection(db.typeOrmConfig)
  const userRepo: Repository<User> = conn.getRepository(User)
  try {
    const userPromises: Promise<User>[] = users.map(userObj => {
      return userRepo.save(userObj)
    })
    
    await Promise.all(userPromises)
  
    await conn.close()
    console.log('END SEED')
  } catch (error) {
    console.log({error})
    await conn.close()

  }
}

const deleteData = async () => {
  console.log('BEGIN DELETE')
  const conn = await createConnection(db.typeOrmConfig)
  const userRepo: Repository<User> = conn.getRepository(User)

  await userRepo.clear()

  await conn.close()
  console.log('END DELETE')
}

export { seedData, deleteData }

