import { Router } from 'express'
import { accessChat, addToGrp, createGrp,  fetchChats, removeFromGrp, renameGrp } from '../controllers/chat.js'

const router = Router()

router.route('/chat/:id').post(accessChat)
router.route('/chats').get(fetchChats)
router.route('/newgrp').post(createGrp)
router.route('/renamegrp').put(renameGrp)
router.route('/exitgrp').put(removeFromGrp)
router.route('/addself').put(addToGrp)

export default router