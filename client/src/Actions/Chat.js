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