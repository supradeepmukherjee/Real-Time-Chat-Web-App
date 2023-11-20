import { configureStore } from '@reduxjs/toolkit'
import { chatReducer } from './Reducers/Chat'
import { passwordReducer, updateMyProfileReducer, userProfileReducer, userReducer } from './Reducers/User'
import { welcomeReducer } from './Slices/Welcome'
import { themeReducer } from './Slices/Theme'
import { currentChatReducer } from './Slices/CurrentChat'
import { getMsgsReducer, sendMsgReducer } from './Reducers/Msg'

const store = configureStore({
    reducer: {
        dark: themeReducer,
        user: userReducer,
        welcome: welcomeReducer,
        chat: chatReducer,
        currentChat: currentChatReducer,
        sendMsg: sendMsgReducer,
        getMsgs: getMsgsReducer,
        userProfile: userProfileReducer,
        updateMyProfile: updateMyProfileReducer,
        password: passwordReducer,
    },
    // devTools: false
})

export default store