import MongoDBContainer from '../../containers/mongoDbContainer'
import productModel from '../../schemas/productSchema'

class ProductsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super(productModel) //productModel = mongoose.model('products', ProductSchema)
  }

  public async getAll(): Promise<any[] | any> {
    try{
      const foundItems = await this.model.find({})

      return foundItems

    } catch (error) {
      console.log(error)
    }
  }

  public async getById(id: any): Promise<any | Error> {
    try {
      const foundItem = await this.model.findOne({ _id: id }, { __v: 0 })

      if (foundItem === null) {
          return { error: 'Product not found' }
      } else {
          return foundItem
      }
  } catch (err) {
      console.log('Method getById: ', err)
  }
}

  async addProduct(product: any): Promise<any | void> {
    try {
      const productToSave = new this.model(product)
      const productAdded = await productToSave.save() 

      return productAdded
    } catch (err) {
      console.log(err)
    }
  }

  public async updateProduct(id: any, newData: any): Promise<any> {
    try {
      const updatedData = await this.model.updateOne({ _id: id }, newData)

      if (updatedData.matchedCount === 0) {
          return { error: 'Product not found.' }
      } else {
          return { msg: `Product ${id} updated!` }
      }
     
  } catch (err) {
      console.log('Method update: ', err)
  }
  }

  public async deleteProduct(id: any): Promise<any> {
    try {
      const deletedData = await this.model.deleteOne({ _id: id})

      if (deletedData.deletedCount === 0) {
        return { error: 'Product not found.' }
    } else {
        return { msg: 'Product deleted.' }
    }

    } catch (err) {
        console.log('Method deleteById: ', err)
    }
  }

}

export default new ProductsDAOMongoDB()