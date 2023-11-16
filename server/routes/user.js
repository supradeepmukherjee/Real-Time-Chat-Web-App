import { Router } from 'express'
import { login, register, allUsers } from '../controllers/user.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/users').get(auth, allUsers)

export default router