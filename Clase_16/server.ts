import express from 'express'
import routes from './api/routes/routes'
import auth from './api/middlewares/auth'
import dotenv from 'dotenv'
import wrongRoute from './api/middlewares/wrongRoute'
import path from 'path'
import { Server as IOServer } from 'socket.io'
import products from './api/models/ProductsContainer';
import chat from './api/models/ChatContainer'

dotenv.config()
const port = process.env.PORT
const app = express()

const serverExpress = app.listen(port, () => { 
    console.log(`Server listening on port: ${port}`)
})

const io = new IOServer(serverExpress)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(auth)
app.use('/api', routes)
app.use(express.static(path.join(__dirname, '../public')))
app.use(wrongRoute)




io.on('connection', async (socket) => {
    socket.emit('server:products', await products.getAll())
    socket.emit('server:message', await chat.getAllMessages())

    socket.on('client:product', async (productInfo) => {
        products.addProduct(productInfo)
        io.emit('server:products', await products.getAll())
    })

    socket.on('client:message', async (messageInfo) => {
        chat.addMessage(messageInfo)
        io.emit('server:message', await chat.getAllMessages())
    })
})
