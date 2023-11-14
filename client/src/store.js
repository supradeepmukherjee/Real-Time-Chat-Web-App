import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './Theme'

const store = configureStore({
    reducer: {
        dark: themeReducer
    },
    // devTools: false
})

export default store