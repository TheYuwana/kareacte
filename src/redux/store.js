import { configureStore } from '@reduxjs/toolkit'
import centerReducer from './center'

// Register created stores
export default configureStore({
    reducer: {
        center: centerReducer
    }
})