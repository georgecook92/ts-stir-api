import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export default class TagCategory {

    constructor (data: TagCategory) {
      if (data) {
        this.title = data.title
      }
    }

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
