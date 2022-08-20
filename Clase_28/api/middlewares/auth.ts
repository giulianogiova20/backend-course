import { Request, Response, NextFunction } from 'express'

/* export default (req: Request, res: Response, next: NextFunction) => {
  const { isAdmin } = req.query

  if (
    !req.originalUrl.includes('/api/cart') &&
    isAdmin !== 'true' &&
    req.method !== 'GET'
  ) {
    return res.status(401).json({
      error: -1,
      msg: `${req.method}: ${req.originalUrl} --> Unauthorized`,
    })
  }

  next()
}
 */


const auth = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next()
	return res.render("unauthorized")
}
export default auth