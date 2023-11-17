import { configureStore } from '@reduxjs/toolkit'
import { passwordReducer, updateMyProfileReducer, userProfileReducer, userReducer } from './Reducers/User'
import { themeReducer } from './Theme'

const store = configureStore({
    reducer: {
        dark: themeReducer,
        user: userReducer,
        userProfile: userProfileReducer,
        updateMyProfile: updateMyProfileReducer,
        password: passwordReducer,
    },
    // devTools: false
})

export default store