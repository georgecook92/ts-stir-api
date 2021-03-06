import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn
} from 'typeorm'
import * as uuid from 'uuid/v4'
import { Tag } from '.';

@Entity()
export default class TagCategory {

    constructor (data: TagCategory) {
      if (data) {
        this.title = data.title
        this.id = data.id || uuid()
      }
    }

    @PrimaryColumn()
    id?: string;

    @Column()
    title: string;

    @OneToMany(type => Tag, tag => tag.tagCategory)
    tags?: Tag[]

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
