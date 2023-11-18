import { createReducer, createAction } from "@reduxjs/toolkit";

const changeTheme = createAction('changeTheme')
const defaultTheme = createAction('defaultTheme')

const initialState = { darkTheme: false }

export const themeReducer = createReducer(initialState, builder => {
    builder.addCase(defaultTheme, state => {
        state.darkTheme = false
    })
    builder.addCase(changeTheme, state => {
        state.darkTheme = true
    })
})

export const darkTheme = () => dispatch => dispatch({ type: 'changeTheme' })
export const lightTheme = () => dispatch => dispatch({ type: 'defaultTheme' })