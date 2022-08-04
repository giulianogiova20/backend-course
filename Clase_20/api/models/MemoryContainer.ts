import { Product, StoredProduct } from '../interfaces'

class MemoryContainer {
    memoryProducts: any[]

    constructor() {
        this.memoryProducts = []
    }

    public async addMemoryProduct(product: any): Promise<any | void> {
        try {
            const id: number =
                this.memoryProducts.length === 0
                    ? 1
                    : Math.max(...this.memoryProducts.map((object: any) => object.id)) + 1

            const timestamp = new Date().toLocaleString("es-AR")

            const newMemorArray = { ...product, id, timestamp }
            this.memoryProducts.push(newMemorArray)
            return newMemorArray

        } catch (err: any) {
            console.log('Method saveMemoryProducts', err)
        }
    }
}

export default MemoryContainer