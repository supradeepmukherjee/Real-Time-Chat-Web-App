import { Router } from 'express'
import { accessChat, createGrp, exitGrp, fetchChats, fetchGrps } from '../controllers/chat.js'

const router = Router()

router.route('/chat/:id').post(accessChat)
router.route('/chats').get(fetchChats)
router.route('/newgrp').post(createGrp)
router.route('/grps').get(fetchGrps)
router.route('/exitgrp').post(exitGrp)

export default router