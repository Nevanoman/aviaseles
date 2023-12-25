import { createSlice } from '@reduxjs/toolkit'

const filterReducer = createSlice({
  name: 'filter',
  initialState: {
    filter: [],
  },
  reducers: {
    toggleFilter(state, action) {
      const newFilter = [...state.filter, action.payload]
      const uniqueFilter = Array.from(new Set(newFilter))
      return {
        ...state,
        filter: uniqueFilter.filter((item) => item !== 'Все'),
      }
    },

    removeFilter(state, action) {
      return {
        ...state,
        filter: state.filter.filter((item) => item !== action.payload),
      }
    },
  },
})
export const { toggleFilter, removeFilter } = filterReducer.actions

export default filterReducer.reducer
