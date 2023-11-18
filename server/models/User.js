import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [5, 'Name must be of minimum 5 characters'],
        required: [true, "Please enter a name"]
    },
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Password must be of minimum 8 characters'],
        select: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    chavi: String
},
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}

export const User = mongoose.model('ChatUser', userSchema)