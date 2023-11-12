import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isGrp: {
        type: Boolean,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatUser',
        required: true
    }],
    latestMsg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Msg',
        required: true
    },
    grpAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatUser'
    }
},
    { timestamps: true }
)

export const Model = mongoose.model('Chat', chatSchema)