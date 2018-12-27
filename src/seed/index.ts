import 'reflect-metadata';

import { createConnection, Repository } from 'typeorm'
import * as bcryptjs from 'bcryptjs'
import * as uuid from 'uuid/v4'
import { db } from '../config'
import { User, TagCategory, Tag } from '../models'
import { password } from '../util'

const hashedPassword = password.hashPassword('Ch4ngeme!')

const users: User[] = [
  { firstName: 'George', lastName: 'Cook', email: 'georgecook406@gmail.com', password: hashedPassword },
  { firstName: 'Rhea', lastName: 'Chowdhury', email: 'eahrc94@gmail.com', password: hashedPassword }
]

const tagCategoryId1 = uuid()
const tagCategoryId2 = uuid()

const tagCategories: TagCategory[] = [
  { title: 'Cuisine', id: tagCategoryId1 },
  { title: 'Course', id: tagCategoryId2 }
]

const tags: Tag[] = [
  { title: 'English', tagCategory: <any>{ id: tagCategoryId1 } },
  { title: 'French', tagCategory: <any>{ id: tagCategoryId1 } },
  { title: 'Italian', tagCategory: <any>{ id: tagCategoryId1 } },
  { title: 'Starter', tagCategory: <any>{ id: tagCategoryId2 } },
  { title: 'Main', tagCategory: <any>{ id: tagCategoryId2 } },
  { title: 'Dessert', tagCategory: <any>{ id: tagCategoryId2 } }
]


const seedData = async () => {
  console.log('BEGIN SEED')
  const conn = await createConnection(db.typeOrmConfig)
  try {
    await conn.transaction(async transaction => {
      const userRepo: Repository<User> = transaction.getRepository(User)
      const tcRepo: Repository<TagCategory> = transaction.getRepository(TagCategory)
      const tagRepo: Repository<TagCategory> = transaction.getRepository(Tag)
      const userPromises: Promise<User>[] = users.map(userObj => userRepo.save(userObj))
      const tcPromises: Promise<TagCategory>[] = tagCategories.map(tcObj => tcRepo.save(tcObj))
      await Promise.all([].concat.apply([], [userPromises, tcPromises]))
      const tagPromises: Promise<Tag>[] = tags.map(tagObj => tagRepo.save(tagObj))
      await Promise.all(tagPromises)
      await transaction
      console.log('END SEED')
    })
  } catch (error) {
    console.log({error})
    await conn.close()
    return
  }
  await conn.close()
}

export { seedData }

