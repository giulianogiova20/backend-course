import { NextFunction, Request, Response } from 'express'
import path from 'path'

export const getLoginController = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.user) {
        res.sendFile(path.join(__dirname, './public/login.html'))
    }
    next()
}

export const postLoginController = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user
    req.session.user = user
    res.redirect('/')
}