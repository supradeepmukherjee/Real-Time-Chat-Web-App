import { User } from '../models/User.js'
import { Chat } from '../models/Chat.js'

export const accessChat = async (req, res) => {
    try {
        const id = req.params.id
        let chat = await Chat.find({
            isGrp: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: id } } },
            ]
        })
            .populate('users').populate('latestMsg')
        chat = await User.populate(chat, {
            path: 'latestMsg.sender',
            select: 'name email'
        })
        if (chat.length > 0) return res.status(200).json({ success: true, chat: chat[0] })
        else {
            const newChat = await Chat.create({
                users: [req.user._id, id],
                name: 'sender',
                isGrp: false
            })
            const readyChat = await Chat.findOne({ _id: newChat._id }).populate('users')
            res.status(200).json({ success: true, chat: readyChat })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const fetchChats = async (req, res) => {
    try {
        const chat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users')
            .populate('grpAdmin')
            .populate('latestMsg')
            .sort({ updatedAt: -1 })
        chat = await User.populate(chat, {
            path: 'latestMsg.sender',
            select: 'name email'
        })
        res.status(200).json({ success: true, chat })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const fetchGrps = async (req, res) => {
    try {
        const grps = await Chat.where('isGrpChat').equals(true)
        res.status(200).json({ success: true, grps })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const createGrp = async (req, res) => {
    try {
        let users = JSON.parse(req.body.users)
        users.push(req.user)
        const grpChat = await Chat.create({
            name: req.body.name,
            users,
            isGrp: true,
            grpAdmin: req.user
        })
        const readyGrp = await Chat.findOne({ _id: grpChat._id }).populate('users').populate('grpAdmin')
        res.status(200).json({ success: true, grp: readyGrp })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const exitGrp = async (req, res) => {
    try {
        const { chatID, userID } = req.body
        const exited = await Chat.findByIdAndUpdate().populate('users').populate('grpAdmin')
        res.status(200).json({ success: true, exited })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}