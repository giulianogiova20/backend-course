//Express
import express from 'express'
import session from 'express-session'
//Models
import products from './api/models/ProductsContainer';
import chat from './api/models/ChatContainer'
import User from './api/models/schema/user'
//Server Config
import {serverConfig, args} from "./api/config/server"
import config from './api/config/mongoDBatlas'
import MongoStore from "connect-mongo"
import mongoose from 'mongoose'
import { Server as IOServer } from 'socket.io'
//Session Routes
import sessionLogin from "./api/routes/session/login"
import sessionLogout from "./api/routes/session/logout"
import sessionSignup from "./api/routes/session/signup"
//Products Routes
import productsRouter from './api/routes/products'
//Cart Routes
import cartRouter from './api/routes/cart'
//Others
import flash from "connect-flash"
import auth from './api/middlewares/auth'
import normalizeAndDenormalize from './api/utils/normalizr'
import cookieParser from 'cookie-parser'
import passport from 'passport'
//import dotenv from 'dotenv'
import path from 'path'

import cluster from 'cluster';
import os from 'os';


//Desafio Clase 28
import randomRouter from "./api/routes/randoms"
import info from "./api/routes/info"

declare module 'express-session' {
	export interface SessionData {
		logged: boolean
		contador: number
		user: string
		admin: boolean
	}
}

//Desafio Clase 32
import compression from 'compression'
import Logger from './api/utils/logger'
// Test loggers
Logger.info("Información");
Logger.debug("Debug");
Logger.warn("Advertencia");
Logger.error("Error");

//DOTENV
//dotenv.config()
const port = args.p || process.env.PORT || serverConfig.PORT || 8080

//SERVER
const app = express()

if ( process.argv[3] === "cluster" && cluster.isPrimary ) {

  const cpuQty = os.cpus().length //Numero de procesadores detectados.
  Logger.info(`Number of CPUs: ${cpuQty}`)
  Logger.info(`Master PID ${process.pid} is running`)

  for (let i = 0; i < cpuQty; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker: any) => {
    Logger.info(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })

} else {

//Si entramos en modo distinto de CLUSTER o NO es un proceso primario.

app.use('/api/randoms', randomRouter)

const serverExpress = app.listen(port, () => {
    Logger.info(`Server listening on port ${port}.`, `Process ID: ${process.pid}.`)
})
serverExpress.on('error', (err) => Logger.error(`An error has ocurred when starting: ${err}`))

//SOCKET
const io = new IOServer(serverExpress)
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


}

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
          Logger.info('Connected to MongoDB Atlas')
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

/* app.use("/login", sessionLogin)
app.use("/logout", sessionLogout)
app.use("/signup", sessionSignup)
app.use('/api', productsRouter, cartRouter)

app.get("/", auth, async (req, res: express.Response) => {
	res.render("home", { logged: true, user: req.user })
}) */

app.use("/info", info)
app.use("/infoCompressed", compression(), info)


