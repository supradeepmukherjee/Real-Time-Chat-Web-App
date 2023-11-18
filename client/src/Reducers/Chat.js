import { createReducer, createAction } from "@reduxjs/toolkit";

const allChatsRequest = createAction('allChatsRequest')
const allChatsSuccess = createAction('allChatsSuccess')
const allChatsFailure = createAction('allChatsFailure')
const productDetailsRequest = createAction('productDetailsRequest')
const productDetailsSuccess = createAction('productDetailsSuccess')
const productDetailsFailure = createAction('productDetailsFailure')
const newReviewRequest = createAction('newReviewRequest')
const newReviewSuccess = createAction('newReviewSuccess')
const newReviewFailure = createAction('newReviewFailure')
const delReviewRequest = createAction('delReviewRequest')
const delReviewSuccess = createAction('delReviewSuccess')
const delReviewFailure = createAction('delReviewFailure')
const adminProductsRequest = createAction('adminProductsRequest')
const adminProductsSuccess = createAction('adminProductsSuccess')
const adminProductsFailure = createAction('adminProductsFailure')
const newProductRequest = createAction('newProductRequest')
const newProductSuccess = createAction('newProductSuccess')
const newProductFailure = createAction('newProductFailure')
const delProductRequest = createAction('delProductRequest')
const delProductSuccess = createAction('delProductSuccess')
const delProductFailure = createAction('delProductFailure')
const editProductRequest = createAction('editProductRequest')
const editProductSuccess = createAction('editProductSuccess')
const editProductFailure = createAction('editProductFailure')
const clearMsg = createAction('clearMsg')
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
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const productDetailsReducer = createReducer(initialState, builder => {
    builder.addCase(productDetailsRequest, state => {
        state.loading = true
    })
    builder.addCase(productDetailsSuccess, (state, action) => {
        state.loading = false
        state.productDetails = action.payload
    })
    builder.addCase(productDetailsFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const reviewReducer = createReducer(initialState, builder => {
    builder.addCase(newReviewRequest, state => {
        state.loading = true
    })
    builder.addCase(newReviewSuccess, (state, action) => {
        state.loading = false
        state.review = action.payload
    })
    builder.addCase(newReviewFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(delReviewRequest, state => {
        state.loading = true
    })
    builder.addCase(delReviewSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(delReviewFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})