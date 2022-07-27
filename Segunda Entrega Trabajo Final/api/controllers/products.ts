import { Request, Response } from 'express'
import { productDao } from '../models/daos/index'

const getAll = async(req: Request, res: Response) => {
    const products = await productDao.getAll()

    res.json(products)
}

const getById = async(req: Request, res: Response)  => {
    const { id } = req.params
    const body = await productDao.getById(id)
  
    res.json(body)
}


const addProduct = async(req: Request, res: Response) => {
    const product = req.body
  
    const storedProduct =  await productDao.addProduct(product)
    res.json(storedProduct)
}

const updateProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body
  
    const updatedProduct = await productDao.updateProduct(id, product)
  
    res.json(updatedProduct)
}

const deleteProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const deletedProduct = await productDao.deleteProduct(id)
  
    res.json({
        deletedProduct
    })
}


export { addProduct, deleteProduct, getAll, getById, updateProduct}