import FirebaseContainer from '../../containers/firebaseContainer'
import admin from 'firebase-admin'

class ProductsDAOFirebase extends FirebaseContainer {
  constructor() {
    super('products')
  }

  async getAll(): Promise<any> {
    try{
      const foundItems = await admin
      .firestore()
      .collection(this.collection)
      .get()

    const itemsData = foundItems.docs.map((doc) => doc.data())
    const itemsId = foundItems.docs.map((doc) => doc.id)
    return {itemsData, itemsId}

    } catch (error) {
      console.log(error)
    }
  }

  async checkProductInCollection(id: any): Promise<any | Error> {
    try {
      const foundItem = await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())
        .get()
      
      if (foundItem.exists) {
        return true
      } 
      else {
        return { error: 'Product not found' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id: any): Promise<any | Error> {
    try {
      const foundItem = await this.checkProductInCollection(id)

      if (foundItem === true) {
        const productSelected = await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())
        .get()

        return productSelected.data()
      } 
      else {
        return { error: 'Product not found' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addProduct(product: any): Promise<any | void> {
    try {
      const productAdded = await admin
        .firestore()
        .collection(this.collection)
        .add(product)

      return productAdded
    } catch (err) {
      console.log(err)
    }
  }

  async updateProduct(id: any, newData: any): Promise<any> {
    try {
      const productSelected = await this.checkProductInCollection(id)
      if (productSelected === true)
      {
        await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())
        .update(newData)

      return { msg: 'Product Updated' }
      }
      else {
        return { msg: 'Product not found in products collection.' }
      }
    } catch (error) {
      console.log(error)
    }
  }


  async deleteProduct(id: any): Promise<any> {
    try {
      const productSelected = await this.checkProductInCollection(id)
      if (productSelected === true)
      {
        await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())
        .delete()

      return { msg: 'Product Deleted' }
      }
      else {
        return { msg: 'Product not found in products collection.' }
      }
    } catch (error) {
      console.log(error)
    }
  }

}

export default new ProductsDAOFirebase()