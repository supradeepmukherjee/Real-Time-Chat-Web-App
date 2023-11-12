import mongoose from 'mongoose'

const msgSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatUser',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatUser',
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    }
},
    { timestamps: true }
)

export const Model = mongoose.model('Msg', msgSchema)