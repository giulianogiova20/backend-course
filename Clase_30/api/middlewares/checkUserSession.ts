import { Request, Response, NextFunction } from 'express'
/* import session from 'express-session' */
import session from 'express-session'
import cookieParser from 'cookie-parser'
import path from 'path'
import express from 'express'

/* declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
    }
  }
 */
const checkUserSession = (req: Request, res: Response, next: NextFunction) => {

    if (!req.session?.user) {
        return res.redirect('/api/login')
    } 
    res.sendFile(path.join(__dirname, '../public/home.html'))
    next()
}

export default checkUserSession