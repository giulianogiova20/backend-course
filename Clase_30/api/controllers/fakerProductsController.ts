import { Request, Response } from 'express'
import FakerProducts from '../models/FakerProductsContainer'


export const getFakerProducts = async (req: Request, res: Response) => {
    try {
        const fakerProducts = new FakerProducts()
        const result = await fakerProducts.listFakerProducts()
        console.log('Result', result)
        return res.json(result)
    } catch (err) {
        console.log(`Han error has ocurred; ${err}`)
    }
}