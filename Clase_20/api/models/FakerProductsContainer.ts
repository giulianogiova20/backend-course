import MemoryContainer from "./MemoryContainer"
import fakerProdGenerator from '../utils/fakerProdGenerator'

class FakerProductsContainer extends MemoryContainer {
    
    constructor() {
        super()
    }

    listFakerProducts (qty = 5) {
        const fakerProductsArray = []
        for (let i = 0; i < qty; i++) {

            const fakerProduct = fakerProdGenerator()
            const fakerProductSaved = this.addMemoryProduct(fakerProduct)
            fakerProductsArray.push(fakerProductSaved)
        }
        return fakerProductsArray
    }
}

export default FakerProductsContainer