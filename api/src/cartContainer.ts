import fs from 'fs'
import { Cart,  StoredProduct } from '../interfaces'

class CartContainer {
  private static filePath: string
  private readonly productFilePath: string

  constructor(filePath: string) {
    CartContainer.filePath = filePath
    this.productFilePath = './api/data/products.txt'
  }

  private readonly writeFile = async (data: Cart[]): Promise<void> => {
    try {
      await fs.promises.writeFile(CartContainer.filePath, JSON.stringify(data))
    } catch (err: any) {
      console.log('Method: writeFile, ', err)
    }
  }

  private readonly readCartFile = async (): Promise<Cart[]> => {
    try {
      return (await fs.promises.readFile(CartContainer.filePath, 'utf8'))
        ? JSON.parse(await fs.promises.readFile(CartContainer.filePath, 'utf8'))
        : ([] as Cart[])
    } catch (err: any) {
      if (err.errno === -2) {
        try {
          await fs.promises.writeFile(CartContainer.filePath, JSON.stringify([]))
          return [] as Cart[]
        } catch (err: any) {
          console.error(
            'Method: readFile: could not create file in such directory.',
            err
          )
        }
      } else {
        console.log('Method readFile: ', err)
      }
      return [] as Cart[]
    }
  }

  private readonly readProductsFile = async (): Promise<StoredProduct[]> => {
    try {
      return (await fs.promises.readFile(this.productFilePath, 'utf8'))
        ? JSON.parse(await fs.promises.readFile(this.productFilePath, 'utf8'))
        : ([] as StoredProduct[])
    } catch (err: any) {
      if (err.errno === -2) {
        try {
          await fs.promises.writeFile(this.productFilePath, JSON.stringify([]))
          return [] as StoredProduct[]
        } catch (err: any) {
          console.error('Could not create file in such directory. ', err)
        }
      } else {
        console.log('Method readFile: ', err)
      }
      return [] as StoredProduct[]
    }
  }

  public createNewCart = async (): Promise<number | Error> => {
    try {
      const cart = await this.readCartFile()
      const timestamp = new Date().toLocaleString('es-AR')

      if (cart.length === 0 || typeof cart === 'undefined') {
        await this.writeFile([{ cartId: 1, timestamp, products: [] }])

        return 1
      }
      
      else{
        const cartId = Math.max(...cart.map((object: Cart) => object.cartId)) + 1
        await this.writeFile([...cart, { cartId, timestamp, products: [] }])

        return cartId
      }
      
    } catch (err: any) {
      console.error(err)
      return err
    }
  }

  public deleteCartById = async (id: number): Promise<number | Error> => {
    try {
        const cart = await this.readCartFile()

        if (cart.length === 0 || typeof cart === 'undefined') {
            return -1
        } else {
            const newCart = cart.filter((object: Cart) => object.cartId !== id)

            if (newCart.length === cart.length) {
                return -2
            } else {
                await this.writeFile(newCart)
                return 200
            }
        }
    } catch (err: any) {
        console.error(err)
        return err
    }
    }

    public getProductsByCartId = async (id: number): Promise<StoredProduct[] | Error> => {
        try {
          const cart = await this.readCartFile()
          const foundCart = cart.find((object: Cart) => object.cartId === id)
    
          if (typeof foundCart !== 'undefined') {
            const cartProducts = foundCart.products
            if (cartProducts.length === 0) {
                return new Error('Cart has no products')
            } else {
                return cartProducts 
            }
          }
          else{
            return new Error('Cart not found')
        }
        
        } catch (err: any) {
          console.error(err)
          return err
        }
      }

      public addProductsById = async (id: number, productId: {id: number}): Promise<void | StoredProduct[] | Error> => {
        try {
          const carts = await this.readCartFile()
          const foundCart = carts.find((object: Cart) => object.cartId === id)
    
          const products = await this.readProductsFile()
          const nProductId = Number(productId.id)
          const productToAdd = products.filter((object: StoredProduct) =>{
            if (object.id === nProductId){
                return object
            }
          })
          if (productToAdd.length === 0) {
            return new Error(`Product with id: ${nProductId} not found`)
          }
          else {
            if (typeof foundCart !== 'undefined' && typeof productToAdd !== 'undefined') {
                const newProducts = [...foundCart.products, ...productToAdd]
                const newCart = carts.map((object: Cart) =>
                  object.cartId === id ? { ...object, products: newProducts } : object
                )
        
                await this.writeFile(newCart)
                return (productToAdd)
            }
          
          }
        } catch (err: any) {
          console.error(err)
          return err
        }
      }

      public deleteProductByCartId = async (id: number, productId: number): Promise<void | Error> => {
        try {
          const carts = await this.readCartFile()
          const foundCart = carts.find((object: Cart) => object.cartId === id)
    
          if (typeof foundCart !== 'undefined') {
            const newProducts = foundCart.products.filter(
              (object) => object.id !== productId
            )
            if (newProducts.length === foundCart.products.length)
            {
                return new Error(`Product with id: ${productId} not found in cart id: ${id}`)
            }
            else {
                const newCart = carts.map((object: Cart) =>
                object.cartId === id ? { ...object, products: newProducts } : object )
                await this.writeFile(newCart) 
            }
            }
          else{
            return new Error(`Cart with id: ${id} not found`)
          }
          
        } catch (err: any) {
          console.error(err)
          return err
        }
      }
    
}

export default new CartContainer('./api/data/cart.txt')