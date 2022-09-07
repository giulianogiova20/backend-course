import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import User from '../../models/schema/user'

import {renderSignUp, signUp, renderFailedSignup} from "../../controllers/session"

const sessionSignup = Router()

passport.use("signup", new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
    async (email: string, password: string, done: any) => {
        const newUser = new User({
          email,
          password
        })
        try {
            await newUser.save()
            return done(null, newUser) //1)
        } catch (err:any) {
             if(err.code === 11000) {
                return done(null, false, { message: "User already exists" }) //2)
            }
            console.log(err)
            return done(err) //3) 
              
            }
        }
  
  ))
  

sessionSignup.get('/', renderSignUp)///
sessionSignup.post('/', passport.authenticate('signup', { failureRedirect: '/signup/failed', failureFlash: true}), signUp)
sessionSignup.get('/failed', renderFailedSignup)//

/* FAILURE REDIRECT EXCPECTS: (err, user, info)
1) done(null, user) which means no error and successful authentication

2) done(null, false, {custom Message}) which means no error but either email or password didn't matched.

3)  done(err) which just returns if error occurs while processing. */

export default sessionSignup