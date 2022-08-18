import express from 'express'
import auth from './api/middlewares/auth'
import dotenv from 'dotenv'
import wrongRoute from './api/middlewares/wrongRoute'
import path from 'path'
import { Server as IOServer } from 'socket.io'
import products from './api/models/ProductsContainer';
import chat from './api/models/ChatContainer'
import normalizeAndDenormalize from './api/utils/normalizr'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import MongoStore from "connect-mongo";
import config from './api/dbKeys/config'
import sessionLogin from "./api/routes/session/login"
import sessionLogout from "./api/routes/session/logout"
import sessionSignup from "./api/routes/session/signup"
import productsRouter from './api/routes/products'
import cartRouter from './api/routes/cart'
import User from './api/models/schema/user'
import mongoose from 'mongoose'
import flash from "connect-flash"

declare module 'express-session' {
	export interface SessionData {
		logged: boolean
		contador: number
		user: string
		admin: boolean
	}
}

//DOTENV
dotenv.config()
const port = process.env.PORT

//SERVER
const app = express()
const serverExpress = app.listen(port, () => { 
    console.log(`Server listening on port: ${port}`)
})

const io = new IOServer(serverExpress)

//MIDDLEWARES
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


// CONFIGURACION MOTOR DE PLANTILLAS EJS    
app.set('views', path.join(__dirname, '../api/views'))
app.set('view engine', 'ejs')


const mongoOptions: any = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
          config.mongoDB.URI,
        mongoOptions,
      }),
      secret: process.env.SECRET_KEY as string,
      resave: false,
      saveUninitialized: false,
      rolling: true, // Reinicia el tiempo de expiracion con cada request
      cookie: {
        maxAge: 600000,
      },
    })
  )

mongoose.connect(
  config.mongoDB.URI,
  mongoOptions,
  (err) => {
      try {
          console.log('Connected to MongoDB Atlas')
      } catch (err) {
          throw err
      }
  })
  

//PASSPORT
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

passport.serializeUser((user: any, done: any) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user)
})

//RUTAS

app.use("/login", sessionLogin)
app.use("/logout", sessionLogout)
app.use("/signup", sessionSignup)
app.use('/api', productsRouter, cartRouter)

app.get("/", auth, async (req, res: express.Response) => {
	res.render("home", { logged: true, user: req.user })
})

//SOCKET
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
