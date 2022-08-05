import express from 'express'
import routes from './api/routes/routes'
import auth from './api/middlewares/auth'
import dotenv from 'dotenv'
import wrongRoute from './api/middlewares/wrongRoute'
import path from 'path'
import { Server as IOServer } from 'socket.io'
import products from './api/models/ProductsContainer';
import chat from './api/models/ChatContainer'
import normalizeAndDenormalize from './api/utils/normalizr'



dotenv.config()
const port = process.env.PORT
const app = express()

const serverExpress = app.listen(port, () => { 
    console.log(`Server listening on port: ${port}`)
})

const io = new IOServer(serverExpress)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(auth)


app.use('/api', routes)
app.use(express.static(path.join(__dirname, '../public')))
app.use(wrongRoute)

let messages: any[] = []

io.on('connection', async (socket) => {
     

    socket.emit('server:products', await products.getAll())
    socket.emit('server:message', messages)

    socket.on('client:product', async (productInfo) => {
        products.addProduct(productInfo)
        io.emit('server:products', await products.getAll())
    })

    socket.on('client:message', async (messageInfo) => {
        messageInfo.id = messages.length+1
        messages.push(messageInfo)
        chat.writeChatToFile(messages)
        //compression rate
        const denormalizedMessages = messages
        const normalizedMessages = normalizeAndDenormalize('normalize', messages)
        const lengthNormalized = JSON.stringify(normalizedMessages).length;
        const lengthDenormalized = JSON.stringify(denormalizedMessages).length;
        let compressionRate = Math.round((lengthNormalized*100) / lengthDenormalized)
        console.log(`Compression Rate: ${(100 - compressionRate).toFixed(2)}%`)
        io.emit('server:message', messages)
    })
})
