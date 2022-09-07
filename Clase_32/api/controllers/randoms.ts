import { Request, Response } from 'express'
import { fork } from 'child_process'
import Logger from '../utils/logger'

export const getRandomNumbers = (req: Request, res: Response) => {
  const { amount } = req.query
  let qty = Number(amount)
  if (!qty) qty = 100000000
  const child = fork("./api/utils/getRandom.js")
  child.send(qty)
  child.on("message", (msg) => {
    //res.send(msg)
    res.end(JSON.stringify(msg, null, 3))
  })

  child.on("exit", (code) => {
    Logger.info("Se ha cerrado el proceso", code)
  })
}