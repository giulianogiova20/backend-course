import { mariaDBOptions } from '../../DB/configDB'
import { Knex } from 'knex'
import { Error, Product, StoredProduct } from '../interfaces'

class ProductsContainer {
    
 
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
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
            table.integer('timestamp')
          })
        } catch (error) {
          console.error(error)
        }
      }
    }


    public async addProduct(product: Product): Promise<void> {
      try {
        const timestamp = Date.now()
        await this.db.insert({ ...product, timestamp }).into(this.table)
      } 
      catch (err: any) {
        console.log('Method save: ', err)
      }
    }

    public async getAll(): Promise<StoredProduct[]> {
      const products: StoredProduct[] = await this.db
      .select('*')
      .from(this.table)

    return products
      }
    
    public async getById(id: number): Promise<StoredProduct | Error> {
      try {
        const product: StoredProduct = await this.db.select('*').where('id',id).from(this.table)
     
        if (product) {
          return product
        }
        else {
          return { error: 'Product not found' }
        }
      } catch (err: any) {
        console.log('Method getById: ', err)
      }
      return { error: 'fetch item method failed' }
    }
  
    public async updateProduct(id: number, product: Product): Promise<void | Error> {
      try {
        await this.db.where('id',id)
          .update({title: product.name, price: product.price, thumbnail: product.photoURL})
            .from(this.table)
      } catch (err: any) {
        console.log('Method update: ', err)
      }
    }

    public async deleteProduct(id: number): Promise<void | Error> {
      try {
       await this.db.delete('*').where('id',id).from(this.table)
      } catch (err: any) {
        console.log('Method deleteById: ', err)
      }
    }


}

export default new ProductsContainer(mariaDBOptions, 'products')