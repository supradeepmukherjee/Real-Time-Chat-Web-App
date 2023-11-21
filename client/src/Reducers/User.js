import { createReducer, createAction } from "@reduxjs/toolkit";

const loginRequest = createAction('loginRequest')
const loginSuccess = createAction('loginSuccess')
const loginFailure = createAction('loginFailure')
const registerRequest = createAction('registerRequest')
const registerSuccess = createAction('registerSuccess')
const registerFailure = createAction('registerFailure')
const loadUserRequest = createAction('loadUserRequest')
const loadUserSuccess = createAction('loadUserSuccess')
const loadUserFailure = createAction('loadUserFailure')
const allUsersRequest = createAction('allUsersRequest')
const allUsersSuccess = createAction('allUsersSuccess')
const allUsersFailure = createAction('allUsersFailure')
const updateProfileRequest = createAction('updateProfileRequest')
const updateProfileSuccess = createAction('updateProfileSuccess')
const updateProfileFailure = createAction('updateProfileFailure')
const changePasswordRequest = createAction('changePasswordRequest')
const changePasswordSuccess = createAction('changePasswordSuccess')
const changePasswordFailure = createAction('changePasswordFailure')
const forgotPasswordRequest = createAction('forgotPasswordRequest')
const forgotPasswordSuccess = createAction('forgotPasswordSuccess')
const forgotPasswordFailure = createAction('forgotPasswordFailure')
const resetPasswordRequest = createAction('resetPasswordRequest')
const resetPasswordSuccess = createAction('resetPasswordSuccess')
const resetPasswordFailure = createAction('resetPasswordFailure')
const logoutRequest = createAction('logoutRequest')
const logoutSuccess = createAction('logoutSuccess')
const logoutFailure = createAction('logoutFailure')
const clearMsg = createAction('clearMsg')
const clearError = createAction('clearError')

const initialState = { isAuthenticated: false }

export const userReducer = createReducer(initialState, builder => {
    builder.addCase(loginRequest, state => {
        state.loading = true
    })
    builder.addCase(loginSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(loginFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    builder.addCase(registerRequest, state => {
        state.loading = true
    })
    builder.addCase(registerSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(registerFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    builder.addCase(loadUserRequest, state => {
        state.loading = true
    })
    builder.addCase(loadUserSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(loadUserFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    builder.addCase(allUsersRequest, state => {
        state.loading = true
    })
    builder.addCase(allUsersSuccess, (state, action) => {
        state.loading = false
        state.users = action.payload
    })
    builder.addCase(allUsersFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(logoutRequest, state => {
        state.loading = true
    })
    builder.addCase(logoutSuccess, state => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
    })
    builder.addCase(logoutFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const updateMyProfileReducer = createReducer({}, builder => {
    builder.addCase(updateProfileRequest, state => {
        state.loading = true
    })
    builder.addCase(updateProfileSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(updateProfileFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
})

export const passwordReducer = createReducer({}, builder => {
    builder.addCase(changePasswordRequest, state => {
        state.loading = true
    })
    builder.addCase(changePasswordSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(changePasswordFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(forgotPasswordRequest, state => {
        state.loading = true
    })
    builder.addCase(forgotPasswordSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(forgotPasswordFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(resetPasswordRequest, state => {
        state.loading = true
    })
    builder.addCase(resetPasswordSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(resetPasswordFailure, (state, action) => {
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