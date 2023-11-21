import { createReducer, createAction } from "@reduxjs/toolkit";

const allChatsRequest = createAction('allChatsRequest')
const allChatsSuccess = createAction('allChatsSuccess')
const allChatsFailure = createAction('allChatsFailure')
const productDetailsRequest = createAction('productDetailsRequest')
const productDetailsSuccess = createAction('productDetailsSuccess')
const productDetailsFailure = createAction('productDetailsFailure')
const accessChatRequest = createAction('accessChatRequest')
const accessChatSuccess = createAction('accessChatSuccess')
const accessChatFailure = createAction('accessChatFailure')
const newGrpRequest = createAction('newGrpRequest')
const newGrpSuccess = createAction('newGrpSuccess')
const newGrpFailure = createAction('newGrpFailure')
const delReviewRequest = createAction('delReviewRequest')
const delReviewSuccess = createAction('delReviewSuccess')
const delReviewFailure = createAction('delReviewFailure')
const clearError = createAction('clearError')

const initialState = {}

export const chatReducer = createReducer(initialState, builder => {
    builder.addCase(allChatsRequest, state => {
        state.chats = []
        state.loading = true
    })
    builder.addCase(allChatsSuccess, (state, action) => {
        state.loading = false
        state.chats = action.payload
    })
    builder.addCase(allChatsFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(accessChatRequest, state => {
        state.loading = true
    })
    builder.addCase(accessChatSuccess, (state, action) => {
        state.loading = false
        state.chat = action.payload
    })
    builder.addCase(accessChatFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(newGrpRequest, state => {
        state.loading = true
    })
    builder.addCase(newGrpSuccess, (state, action) => {
        state.loading = false
        state.chat = action.payload
    })
    builder.addCase(newGrpFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})