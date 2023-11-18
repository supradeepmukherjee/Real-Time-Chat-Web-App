import { configureStore } from '@reduxjs/toolkit'
import { chatReducer } from './Reducers/Chat'
import { passwordReducer, updateMyProfileReducer, userProfileReducer, userReducer } from './Reducers/User'
import { themeReducer } from './Theme'

const store = configureStore({
    reducer: {
        dark: themeReducer,
        user: userReducer,
        chat: chatReducer,
        userProfile: userProfileReducer,
        updateMyProfile: updateMyProfileReducer,
        password: passwordReducer,
    },
    // devTools: false
})

export default store