import { configureStore } from '@reduxjs/toolkit'
import { chatReducer } from './Reducers/Chat'
import { passwordReducer, updateMyProfileReducer, userProfileReducer, userReducer } from './Reducers/User'
import { welcomeReducer } from './Slices/Welcome'
import { themeReducer } from './Slices/Theme'

const store = configureStore({
    reducer: {
        dark: themeReducer,
        user: userReducer,
        welcome: welcomeReducer,
        chat: chatReducer,
        userProfile: userProfileReducer,
        updateMyProfile: updateMyProfileReducer,
        password: passwordReducer,
    },
    // devTools: false
})

export default store