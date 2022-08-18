import { Router } from "express";

import { logout } from "../../controllers/session"

const sessionLogout = Router();

sessionLogout.post("/", logout);

export default sessionLogout