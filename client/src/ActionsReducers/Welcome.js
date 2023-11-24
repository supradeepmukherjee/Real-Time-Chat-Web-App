import { createReducer, createAction } from "@reduxjs/toolkit";

const startChat = createAction('startChat')

const initialState = { welcomeScreen: true }

export const welcomeReducer = createReducer(initialState, builder => {
    builder.addCase(startChat, state => {
        state.welcomeScreen = false
    })
})

export const chatStarted = () => dispatch => dispatch({ type: 'startChat' })