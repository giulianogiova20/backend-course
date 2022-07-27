import dotenv from 'dotenv'

dotenv.config()

let productDao: any
let cartDao: any

switch (process.env.DB_PROVIDER) {
  case 'mongodb':
    import('./products/daoProductsMongoDb').then((dao) => (productDao = dao.default))
    import('./cart/daoCartMongoDb').then((dao) => (cartDao = dao.default))
    break

  case 'firebase':
    import('./products/daoProductsFirebase').then((dao) => (productDao = dao.default))
    import('./cart/daoCartFirebase').then((dao) => (cartDao = dao.default))
    break

  case 'fs':
    import('./products/daoProductsFilesystem').then((dao) => (productDao = dao.default))
    import('./cart/daoCartFilesystem').then((dao) => (cartDao = dao.default))

    break

  default:
    productDao = require('./products/daoProductsMongoDb')
    cartDao = require('./cart/daoCartMongoDb')
    break
   
    
}

export { productDao, cartDao }
