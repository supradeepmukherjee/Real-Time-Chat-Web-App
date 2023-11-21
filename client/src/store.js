import { configureStore } from '@reduxjs/toolkit'
import { chatReducer } from './Reducers/Chat'
import { passwordReducer, userReducer } from './Reducers/User'
import { welcomeReducer } from './Slices/Welcome'
import { themeReducer } from './Slices/Theme'
import { currentChatReducer } from './Slices/CurrentChat'
import { getMsgsReducer, sendMsgReducer } from './Reducers/Msg'
import { boxReducer } from './Slices/Box'

const store = configureStore({
    reducer: {
        dark: themeReducer,
        user: userReducer,
        welcome: welcomeReducer,
        chat: chatReducer,
        box: boxReducer,
        currentChat: currentChatReducer,
        sendMsg: sendMsgReducer,
        getMsgs: getMsgsReducer,
        password: passwordReducer,
    },
    // devTools: false
})

export default store