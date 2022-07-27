import { Request, Response } from 'express'
import { cartDao } from '../models/daos/index'

export const createCart = async (req: Request, res: Response) => {
    const cart = await cartDao.createNewCart()

    res.json(cart)
  }

export const deleteCart = async (req: Request, res: Response) => {
    const { id } = req.params

    const cart = await cartDao.deleteCartById(id)

    if (cart instanceof Error) {
        return res.status(500).json({
            error: -1,
            msg: cart.message
        })
    } else {
        if (cart === -1) {
            return res.status(500).json({
                error: -1,
                msg: 'Cart file is empty!'
            })
        } else {
            if (cart === -2){
                return res.status(500).json({
                    error: -2,
                    msg: `There is no cart with id= ${id}`
                })
            } else {
                res.json(`Cart id: ${id} deleted.`)
            }
        }
    }
}

export const getProductsByCartId = async (req: Request, res: Response) => {
    const { id } = req.params
  
    const cart = await cartDao.getProductsByCartId(id)
    if (cart instanceof Error) {
      return res.status(500).json({
        error: -1,
        msg: cart.message
      })
    }
    else {
        res.json(cart)
    }
  }

  export const addToCartById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body //Envío en el body id: number(fs) | any (firebase/mongodb)
  
    const cart = await cartDao.addProductsById(id, product)
  
    if (cart instanceof Error) {
      return res.status(500).json({
        error: -1,
        msg: cart.message,
      })
    }
    else{
        res.json(cart)
    }
    
  }

  export const deleteProductByCartId = async (req: Request, res: Response) => {
    const { id, id_prod } = req.params
  
    const cart = await cartDao.deleteProductByCartId(id, id_prod)
  
    if (cart instanceof Error) {
      return res.status(500).json({
        error: -1,
        msg: cart.message,
      })
    }
    else{
        res.json(cart)
    }
    
  }