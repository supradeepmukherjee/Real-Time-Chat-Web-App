import { User } from '../models/User.js'
import { Chat } from '../models/Chat.js'
import { Msg } from '../models/Msg.js'

export const sendMsg = async (req, res) => {
    try {
        const { id, content } = req.body
        let newMsg = await Msg.create({
            sender: req.user._id,
            content,
            chat: id
        })
        newMsg = await Msg.populate('sender', 'name')
        newMsg = await Msg.populate('receiver')
        newMsg = await Msg.populate('chat')
        newMsg = await User.populate(newMsg, {
            path: 'chat.users',
            select: 'name email'
        })
        await Chat.findByIdAndUpdate(req.body.id, { latestMsg: newMsg })
        res.status(200).json({ success: true, newMsg })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const fetchMsgs = async (req, res) => {
    try {
        const msgs = await Msg.find({ chat: req.params.id }).populate('sender receiver chat')
        res.status(200).json({ success: true, msgs })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}