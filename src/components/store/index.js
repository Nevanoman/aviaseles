import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from './slice-tabsReducer'
import filterReducer from './sliсe-filterReducer'
import ticketsReducer from './slice-ticketReducer'

export default configureStore({
  reducer: {
    tabs: tabsReducer,
    filter: filterReducer,
    tickets: ticketsReducer,
  },
})
