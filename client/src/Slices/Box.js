import { createReducer, createAction } from "@reduxjs/toolkit";

const setBox = createAction('setBox')
const closeBox = createAction('closeBox')

const initialState = { box: 0, open: false }

export const boxReducer = createReducer(initialState, builder => {
    builder.addCase(setBox, (state, action) => {
        state.box = action.payload
        state.open = true
    })
    builder.addCase(closeBox, state => {
        state.open = false
    })
})

export const selectBox = n => dispatch => {
    dispatch({
        type: 'setBox',
        payload: n
    })
}
export const boxClosed = () => dispatch => dispatch({ type: 'closeBox' })