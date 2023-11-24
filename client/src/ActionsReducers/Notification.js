import { createReducer, createAction } from "@reduxjs/toolkit";

const setNotifications = createAction('setNotifications')

const initialState = { notifications: [] }

export const notificationsReducer = createReducer(initialState, builder => {
    builder.addCase(setNotifications, (state, action) => {
        state.notifications = action.payload
    })
})

export const notificationsF = notification => dispatch => {
    dispatch({
        type: 'setNotifications',
        payload: notification
    })
}