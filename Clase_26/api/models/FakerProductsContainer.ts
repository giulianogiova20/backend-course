import { faker } from '@faker-js/faker';

class FakerProductsContainer {
    
    memoryProducts: any[]
    constructor() {
        this.memoryProducts = []
    }

    listFakerProducts (qty = 5) {
        const fakerProductsArray = []
        for (let i = 0; i < qty; i++) {
            const product= {
                code: faker.random.word(),
                name: faker.commerce.productName(),
                price: Number(faker.commerce.price()),
                stock: Number(faker.random.numeric()),
                description: faker.commerce.productDescription(),
                photoURL: faker.image.imageUrl(),  
            }
            fakerProductsArray.push(product)
        }
        return fakerProductsArray
    }
}

export default FakerProductsContainer