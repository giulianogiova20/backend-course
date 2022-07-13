import { Message, NewMessage } from '../interfaces'
import { sqliteOptions } from '../../DB/configDB'
import { Knex } from 'knex'

class Chat {
  private db: Knex
  private table: string

  constructor(options: any, table: string) {
    this.db = require('knex')(options)
    this.table = table
    this.createTableIfNotExists()
  }

  private async createTableIfNotExists(): Promise<void> {
    if (!(await this.db.schema.hasTable(this.table))) {
      try {
        await this.db.schema.createTableIfNotExists(this.table, (table) => {
          table.increments('id').primary()
          table.string('email')
          table.string('message')
          table.string('date')
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  public addMessage = async ({ email, message }: NewMessage): Promise<void> => {
    const date = new Date().toLocaleString("es-AR")

    await this.db.insert({ email, message, date }).into(this.table)
  }

  public async getAllMessages(): Promise<Message[]> {
    const messages: Message[] = await this.db.select('*').from(this.table)

    return messages
  }
}

export default new Chat(sqliteOptions, 'chat')