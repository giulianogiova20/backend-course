import MongoDBContainer from '../../containers/mongoDbContainer'
import cartModel from '../../schemas/cartSchema'

class CartsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super(cartModel)
  }

  async createNewCart() {
    try {
      const cart = new this.model({})
      const { _id } = await cart.save()

      return _id
    } catch (err) {
      console.log(err)
    }
  }

  async deleteCartById(id: any) {
    try {
      const cart: any = await this.model.findOne({ _id: id })

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        await cart.remove()
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getProductsByCartId(id: any) {
    try {
      const cart: any = await this.model.findOne({ _id: id })

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const foundItemsInCart = cart.products
        return foundItemsInCart
      }
      
    } catch (err) {
      console.log(err)
    }
  }

  async addProductsById(id: any, product: {id: any}) {
    try {
      const cart: any = await this.model.findOne({ _id: id })

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const newCartProduct = await this.model.updateOne(
          { _id: id },
          {
            $push: {
              products: {
                product: product
              }
            }
          }
        )
        if (newCartProduct.modifiedCount === 0) {
          return { error: 'Product not added.' }
        } else {
          return { msg: 'Product added.' }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async deleteProductByCartId(id: any, id_prod: any) {
    try {
      const cart: any = await this.model.findOne({ _id: id })

      if (cart === null) {
        return { error: 'Cart not found' }
      } else {
        const deleteCartProduct = await this.model.updateOne(
          {
            _id: id
          },
          {
            $pull: {
              products: {
                product: {id: id_prod}
              }
            }
          })
      console.log(deleteCartProduct)
      if (deleteCartProduct.modifiedCount === 0) {
        return { error: 'Product not found.' }
      } else {
          return { msg: 'Product deleted.' }
      }
    }
    } catch (err) { 
      console.log(err)
    }
  }
}

export default new CartsDAOMongoDB()
