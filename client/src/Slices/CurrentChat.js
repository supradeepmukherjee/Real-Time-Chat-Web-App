import { createReducer, createAction } from "@reduxjs/toolkit";

const setChat = createAction('setChat')

const initialState = { chat: null }

export const currentChatReducer = createReducer(initialState, builder => {
    builder.addCase(setChat, (state, action) => {
        state.chat = action.payload
    })
})

export const selectChat = chat => dispatch => {
    dispatch({
        type: 'setChat',
        payload: chat
    })
}