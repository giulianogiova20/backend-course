import FirebaseContainer from '../../containers/firebaseContainer'
import admin from 'firebase-admin'
import ProductsDAOFirebase from '../products/daoProductsFirebase'

class CartDAOFirebase extends FirebaseContainer {

  constructor() {
    super('carts')
  }

  async createNewCart() {
    try {
      const cartCreated = await admin
        .firestore()
        .collection(this.collection)
        .add({ timestamp: Date.now(), products: [] })

      return { cartCreated, msg: 'Cart succesfully created!'}
    } catch (err) {
      console.log('Method createNewCart: ', err)
    }
  }

  private async checkIfCartExists(id: any): Promise<any | Error> {
    try {
      const cartFound = await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())

      if ((await cartFound.get()).data() === undefined) {
        return false
      } else {
        return cartFound
      }
    } catch (err) {
      console.log('Method addToCartById: ', err)
    }
  }

  async deleteCartById(id: any): Promise<any | void> {
    try {
      const selectedCart = await this.checkIfCartExists(id)

      if (!selectedCart) {
        return -2
      } else {
        selectedCart.delete()
      }
    } catch (err) {
      console.log('Method cartDeleteById: ', err)
    }
  }

  async getProductsByCartId(id: any): Promise<any>{
    try {
      const selectedCart = await this.checkIfCartExists(id)

      if (!selectedCart) {
        return { error: 'Cart not found' }
      } else {
        const cartProducts = (await selectedCart.get()).data()
        return cartProducts
      }
      
    } catch (err) {
      console.log(err)
    }
  }

  async addProductsById(id: any, id_prod: {id: any}): Promise<any> {
    try {
      const selectedCart = await this.checkIfCartExists(id)

      if (!selectedCart) {
        return { error: 'Cart not found' }
      } else {
        const productSelectedExists = await ProductsDAOFirebase.checkProductInCollection(id_prod.id)
        if (productSelectedExists === true)
        {
          selectedCart
          .update({
            products: admin.firestore.FieldValue.arrayUnion(id_prod),
          })
        return { msg: 'Product succesfully added.' }
        } else {
          return { msg: 'Product not found in products collection.' }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProductByCartId(id: any, id_prod: any): Promise<any> {
    try {
      const selectedCart = await this.checkIfCartExists(id)

      if (!selectedCart) {
        return { error: 'Cart not found' }
      } else {
        const cartProducts = (await selectedCart.get()).data()
        const productSelected = cartProducts.products.filter((object: any) => { return object.id === id_prod })
        if (productSelected.length === 0) {
          return { error: `Product id: ${id_prod} not found.`} 
        } else {
          await admin
          .firestore()
          .collection(this.collection)
          .doc(id.toString())
          .update({
            products: admin.firestore.FieldValue.arrayRemove({id: id_prod}),
          })
        return { msg: 'Product succesfully deleted.' }
      }
    }
    } catch (error) {
      console.log(error)
    }
  }

}

export default new CartDAOFirebase()