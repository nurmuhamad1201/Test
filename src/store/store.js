import { configureStore } from '@reduxjs/toolkit'
import  TodoSlice  from '../todoSlise/todoSlice'

export const store = configureStore({
  reducer: {
    TodoSlice:TodoSlice,
  },
})