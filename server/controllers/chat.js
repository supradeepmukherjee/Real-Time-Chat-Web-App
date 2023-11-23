import { User } from '../models/User.js'
import { Chat } from '../models/Chat.js'
import cloudinary from 'cloudinary'

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
            select: 'name email chavi'
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
        const { name } = req.query
        let chat = await Chat.find(
            {
                users: { $elemMatch: { $eq: req.user._id } },
                name: {
                    $regex: name,
                    $options: 'i'
                }
            }
        )
            .populate('users')
            .populate('grpAdmin')
            .populate('latestMsg')
            .sort({ updatedAt: -1 })
        chat = await User.populate(chat, {
            path: 'latestMsg.sender',
            select: 'name chavi email'
        })
        res.status(200).json({ success: true, chat })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const createGrp = async (req, res) => {
    try {
        let { users, name, chavi } = req.body
        users.push(req.user)
        const myCloud = await cloudinary.v2.uploader.upload(chavi, {
            folder: 'ChatChavi',
            width: 150,
            crop: 'scale'
        })
        const grpChat = await Chat.create({
            name,
            users,
            isGrp: true,
            grpAdmin: req.user,
            chavi: myCloud.secure_url
        })
        const readyGrp = await Chat.findOne({ _id: grpChat._id }).populate('users').populate('grpAdmin')
        res.status(200).json({ success: true, grp: readyGrp })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const removeFromGrp = async (req, res) => {
    try {
        const { chatID, userID } = req.body
        const exited = await Chat.findByIdAndUpdate(chatID,
            { $pull: { users: userID } },
            { new: true }
        )
            .populate('users')
            .populate('grpAdmin')
        res.status(200).json({ success: true, exited })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const addToGrp = async (req, res) => {
    try {
        const { chatID, userID } = req.body
        const chat = await Chat.findByIdAndUpdate(chatID,
            { $push: { users: userID } },
            { new: true }
        )
            .populate('users')
            .populate('grpAdmin')
        res.status(200).json({ success: true, chat })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const renameGrp = async (req, res) => {
    try {
        const { id, name } = req.body
        const updatedGrp = await Chat.findByIdAndUpdate(id, { name }, { new: true }).populate('users').populate('grpAdmin')
        res.status(200).json({ success: true, updatedGrp })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}