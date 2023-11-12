import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './Slices/Theme'

const store = configureStore({
    reducer: {
        dark: themeReducer
    },
    // devTools: false
})

export default store