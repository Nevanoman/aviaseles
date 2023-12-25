import { createSlice } from '@reduxjs/toolkit'

const tabsReducer = createSlice({
  name: 'tabs',
  initialState: {
    tabs: '',
  },
  reducers: {
    toggleSorting(state, action) {
      return {
        ...state,
        tabs: action.payload,
      }
    },
  },
})

export const { toggleSorting } = tabsReducer.actions

export default tabsReducer.reducer
