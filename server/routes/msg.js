import { Router } from 'express'
import { fetchMsgs, sendMsg } from '../controllers/msg.js'

const router = Router()

router.route('/').get(fetchMsgs)
router.route('/').post(sendMsg)

export default router