import { User } from '../models/User.js'

export const register = async (req, res) => {
    try {
        const { name, email, password, chavi } = req.body
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ success: false, msg: 'User already exists' })
        const myCloud = await cloudinary.v2.uploader.upload(chavi, {
            folder: 'EcomChavi',
            width: 150,
            crop: 'scale'
        })
        user = await User.create({
            name,
            email,
            password,
            chavi: myCloud.secure_url
        })
        sendToken(user, 201, res)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.msg })
    }
}

