import fs from 'fs'
import FileContainer from '../../containers/filesystemContainer'
import { Product, StoredProduct } from '../../../interfaces'


class ProductsDAOFilesystem extends FileContainer {
    constructor() {
        super('./api/data/products.txt')
    }

    private readonly readFile = async (): Promise<StoredProduct[]> => {
        try {
            return (await fs.promises.readFile(this.filePath, 'utf8'))
            ? JSON.parse(await fs.promises.readFile(this.filePath, 'utf8'))
            : ([] as StoredProduct[])
        } catch (err: any) {
            if (err.errno === -2) {
            try {
                await fs.promises.writeFile(this.filePath, JSON.stringify([]))
                return [] as StoredProduct[]
            } catch (err: any) {
                console.error('Could not create file in such directory. ', err)
            }
            } else {
            console.log('readFile: ', err)
            }
            return [] as StoredProduct[]
        }
    }

    private readonly writeFile = async (data: Array<Product>): Promise<void> => {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data))
        } catch (err: any) {
            console.log('Method writeFile: ', err)
        }
    }

    public async addProduct(product: Product): Promise<number | void> {
        try {
            const fileData: StoredProduct[] = await this.readFile()
            const id: number =
            fileData.length === 0
                ? 1
                : Math.max(...fileData.map((object: StoredProduct) => object.id)) + 1

            const timestamp = new Date().toLocaleString('es-AR')

            fileData.push({ ...product, id, timestamp })
            await this.writeFile(fileData)

            return id
        } catch (err: any) {
            console.log('Method save: ', err)
        }
        }

    public async getAll(): Promise<StoredProduct[]> {
    return await this.readFile()
    }

    public async getById(id: number): Promise<StoredProduct | any> {
        try {
        const fileData: StoredProduct[] = await this.readFile()

        return (
            fileData.find((object: StoredProduct) => object.id === id) ?? {
            error: 'Product not found'
            }
        )
        } catch (err: any) {
        console.log('Method getById: ', err)
        }
        return { error: 'fetch item method failed' }
    }

    public async updateProduct(id: number, product: Product): Promise<void | Error> {
        try {
        const fileData: StoredProduct[] = await this.readFile()
        const newFileData: StoredProduct[] = fileData.map(
            (object: StoredProduct) =>
            object.id === id ? { ...object, ...product } : object
        )

        await this.writeFile(newFileData)
        } catch (err: any) {
        console.log('Method update: ', err)
        }
    }

    public async deleteProduct(id: number): Promise<string | void> {
        try {
        const fileData: StoredProduct[] = await this.readFile()
        const newFileData: StoredProduct[] = fileData.filter(
            (object: StoredProduct) => object.id !== id
        )

        if (fileData.length === newFileData.length) {
            const msg = `There is NO product with id= ${id}`
            return msg
        } else {
            await this.writeFile(newFileData)
            const msg = `Product ${id} deleted`
            return msg
        } 
        } catch (err: any) {
        console.log('Method deleteById: ', err)
        }
    }
}

export default new ProductsDAOFilesystem()
