import axios from 'axios'

export const getChats = name => async dispatch => {
    try {
        dispatch({ type: 'allChatsRequest' })
        const { data } = await axios.get(`/api/chat/chats?name=${name}`)
        dispatch({
            type: 'allChatsSuccess',
            payload: data.chat
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'allChatsFailure',
            payload: err.response.data.msg
        })
    }
}

export const accessChat_ = id => async dispatch => {
    try {
        dispatch({ type: 'accessChatRequest' })
        const { data } = await axios.post(`/api/chat/chat/${id}`)
        dispatch({
            type: 'accessChatSuccess',
            payload: data.chat
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'accessChatFailure',
            payload: err.response.data.msg
        })
    }
}

export const newGrp = (name, users) => async dispatch => {
    try {
        dispatch({ type: 'newGrpRequest' })
        const { data } = await axios.post(`/api/chat/newgrp`, { name, users }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'newGrpSuccess',
            payload: data.grp
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'newGrpFailure',
            payload: err.response.data.msg
        })
    }
}