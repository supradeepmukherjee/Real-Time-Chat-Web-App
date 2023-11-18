import { User } from '../models/User.js'
import cloudinary from 'cloudinary'

export const register = async (req, res) => {
    try {
        const { name, email, password, chavi } = req.body
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ success: false, msg: 'User already exists' })
        const myCloud = await cloudinary.v2.uploader.upload(chavi, {
            folder: 'ChatChavi',
            width: 150,
            crop: 'scale'
        })
        user = await User.create({
            name,
            email,
            password,
            chavi: myCloud.secure_url
        })
        const token = await user.generateToken()
        res.status(201).cookie('token', token, { expires: new Date(Date.now() + (90 * 24 * 60 * 60000)) }).json({ success: true, user, token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')
        if (!user) return res.status(400).json({ success: false, msg: 'User or Password is incorrect' })
        const isMatch = await user.matchPassword(password)
        if (!isMatch) return res.status(400).json({ success: false, msg: 'User or Password is incorrect' })
        const token = await user.generateToken()
        res.status(200).cookie('token', token, { expires: new Date(Date.now() + (90 * 24 * 60 * 60000)) }).json({ success: true, user, token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await User.find({
            name: {
                $regex: req.query.name,
                $options: 'i'
            },
            _id: { $ne: req.user._id }
        })
        res.status(200).json({ users, success: true })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({ success: true, user, msg: 'User fetched successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}