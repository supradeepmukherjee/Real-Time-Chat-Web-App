import axios from 'axios'

export const getMsgs = id => async dispatch => {
    try {
        dispatch({ type: 'getMsgsRequest' })
        const { data } = await axios.get(`/api/msg/${id}`)
        dispatch({
            type: 'getMsgsSuccess',
            payload: data.msgs
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'getMsgsFailure',
            payload: err.response.data.msg
        })
    }
}

export const sendMsg = (id, content) => async dispatch => {
    try {
        dispatch({ type: 'sendMsgRequest' })
        const { data } = await axios.post(`/api/msg`, { id, content }, { headers: { 'Content-Type': 'application/json' } })
        dispatch({
            type: 'sendMsgSuccess',
            payload: data.msg
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'sendMsgFailure',
            payload: err.response.data.msg
        })
    }
}