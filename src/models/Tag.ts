import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { TagCategory } from './'

@Entity()
export default class Tag {

    constructor (data: Tag) {
      if (data) {
        this.title = data.title
      }
    }

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    title: string;

    @ManyToOne(type => TagCategory, tagCategory => tagCategory.tags)
    @JoinColumn()
    tagCategory: TagCategory;

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
