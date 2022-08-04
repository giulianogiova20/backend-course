import { faker } from "@faker-js/faker"


faker.locale = 'es'

const fakerProdGenerator = () => {
    return {
        code: faker.random.word(),
        description: faker.commerce.productDescription(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        photoURL: faker.image.imageUrl(),
        stock: Number(faker.random.numeric())
    }
}

export default fakerProdGenerator