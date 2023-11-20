import { createReducer, createAction } from "@reduxjs/toolkit";

const getMsgsRequest = createAction('getMsgsRequest')
const getMsgsSuccess = createAction('getMsgsSuccess')
const getMsgsFailure = createAction('getMsgsFailure')
const sendMsgRequest = createAction('sendMsgRequest')
const sendMsgSuccess = createAction('sendMsgSuccess')
const sendMsgFailure = createAction('sendMsgFailure')
const clearError = createAction('clearError')

const initialState = {}

export const getMsgsReducer = createReducer(initialState, builder => {
    builder.addCase(getMsgsRequest, state => {
        state.loading = true
    })
    builder.addCase(getMsgsSuccess, (state, action) => {
        state.loading = false
        state.msgs = action.payload
    })
    builder.addCase(getMsgsFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const sendMsgReducer = createReducer(initialState, builder => {
    builder.addCase(sendMsgRequest, state => {
        state.loading = true
    })
    builder.addCase(sendMsgSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(sendMsgFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})