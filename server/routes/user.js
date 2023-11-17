import { Router } from 'express'
import { login, register, allUsers, myProfile } from '../controllers/user.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/users').get(auth, allUsers)
router.route('/me').get(auth, myProfile)

export default router