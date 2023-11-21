import { User } from '../models/User.js'
import { Chat } from '../models/Chat.js'
import { Msg } from '../models/Msg.js'

export const sendMsg = async (req, res) => {
    try {
        const { id, content } = req.body
        let msg = await Msg.create({
            sender: req.user._id,
            content,
            chat: id
        })
        msg = await msg.populate('sender', 'name chavi')
        msg = await msg.populate('chat')
        msg = await User.populate(msg, {
            path: 'chat.users',
            select: 'name email'
        })
        await Chat.findByIdAndUpdate(req.body.id, { latestMsg: msg })
        res.status(200).json({ success: true, msg })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const fetchMsgs = async (req, res) => {
    try {
        const msgs = await Msg.find({ chat: req.params.id }).populate('sender','name chavi email').populate('chat')
        res.status(200).json({ success: true, msgs })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}