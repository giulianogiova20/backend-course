import { Request, Response } from 'express'
import ProductsContainer from '../src/ProductsContainer'

const getAll = async(req: Request, res: Response) => {
    const products = await ProductsContainer.getAll()

    res.json(products)
}

const getById = async(req: Request, res: Response)  => {
    const { id } = req.params
    const body = await ProductsContainer.getById(Number(id))
  
    res.json(body)
}


const addProduct = async(req: Request, res: Response) => {
    const product = req.body
  
    const storedProduct =  await ProductsContainer.addProduct(product)
    res.json(storedProduct)
}

const updateProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body
  
    await ProductsContainer.updateProduct(Number(id), product)
  
    res.json({
      msg: `producto ${id} actualizado`,
    })
}

const deleteProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const deletedProduct = await ProductsContainer.deleteProduct(Number(id))
  
    res.json({
        deletedProduct
    })
}


export { addProduct, deleteProduct, getAll, getById, updateProduct}