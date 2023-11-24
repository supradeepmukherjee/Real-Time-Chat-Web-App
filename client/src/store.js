import { configureStore } from '@reduxjs/toolkit'
import { chatReducer } from './Reducers/Chat'
import { passwordReducer, userReducer } from './Reducers/User'
import { welcomeReducer } from './ActionsReducers/Welcome'
import { themeReducer } from './ActionsReducers/Theme'
import { currentChatReducer } from './ActionsReducers/CurrentChat'
import { boxReducer } from './ActionsReducers/Box'
import { notificationsReducer } from './ActionsReducers/Notification'

const store = configureStore({
    reducer: {
        dark: themeReducer,
        user: userReducer,
        welcome: welcomeReducer,
        chat: chatReducer,
        box: boxReducer,
        currentChat: currentChatReducer,
        notifications: notificationsReducer,
        password: passwordReducer,
    },
    // devTools: false
})

export default store