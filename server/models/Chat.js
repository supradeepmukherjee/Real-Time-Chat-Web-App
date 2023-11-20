import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isGrp: {
        type: Boolean,
        default: false
    },
    chavi: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatUser',
        required: true
    }],
    latestMsg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Msg',
    },
    grpAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatUser'
    }
},
    { timestamps: true }
)

export const Chat = mongoose.model('Chat', chatSchema)