import { Router } from 'express'
const home = Router()

import {renderHome} from "../controllers/session"

home.get('/', renderHome)

export default home