import { Router } from 'express'
import { getRandomNumbers } from '../controllers/randoms'

const randomRouter: Router = Router()

randomRouter.get('/', getRandomNumbers)

export default randomRouter