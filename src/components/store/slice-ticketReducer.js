import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchId = createAsyncThunk('ticket/fetchId', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search')

    if (!res.ok) {
      throw new Error('Failed to receive id!')
    }

    return await res.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchTicket = createAsyncThunk('ticket/fetchTicket', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
    if (!response.ok) {
      if (response.status < 500) {
        throw new Error('Failed to receive tickets!')
      }
    }
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue('Failed to receive tickets!', error.message)
  }
})

const ticketsReducer = createSlice({
  name: 'ticket',
  initialState: {
    tickets: [],
    id: null,
    rec: false,
    allTicket: [],
    ticketsFilter: [],
  },
  reducers: {
    sortedTickets(state, action) {
      const sortedTickets = [...state.ticketsFilter]

      switch (action.payload) {
        case 'Самый дешевый':
          sortedTickets.sort((a, b) => a.price - b.price)
          break
        case 'Самый быстрый':
          sortedTickets.sort((a, b) => a.segments[0].duration - b.segments[0].duration)
          break
        case 'Оптимальный':
          sortedTickets.sort((a, b) => {
            const aScore = a.price + a.segments[0].duration
            const bScore = b.price + b.segments[0].duration
            return aScore - bScore
          })
          break
        default:
        // do nothing
      }

      return {
        ...state,
        ticketsFilter: sortedTickets,
      }
    },
    filterTickets(state, action) {
      let filterTickets = []
      action.payload.forEach((filter) => {
        switch (filter) {
          case 'Без пересадок':
            filterTickets = filterTickets.concat(
              state.tickets.filter((ticket) => ticket.segments[0].stops.length === 0)
            )
            break
          case '1 пересадка':
            filterTickets = filterTickets.concat(
              state.tickets.filter((ticket) => ticket.segments[0].stops.length === 1)
            )
            break
          case '2 пересадки':
            filterTickets = filterTickets.concat(
              state.tickets.filter((ticket) => ticket.segments[0].stops.length === 2)
            )
            break
          case '3 пересадки':
            filterTickets = filterTickets.concat(
              state.tickets.filter((ticket) => ticket.segments[0].stops.length === 3)
            )
            break
          default:
          // do nothing
        }
      })
      return {
        ...state,
        ticketsFilter: filterTickets,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchId.fulfilled, (state, action) => {
        state.id = action.payload.searchId
      })
      // .addCase(fetchId.rejected, (state, action) => {
      //   console.log('rejected fetchId', action)
      // })
      .addCase(fetchTicket.fulfilled, (state, action) => {
        if (state.tickets.length === 0) {
          state.tickets.push(...action.payload.tickets)
        } else {
          state.allTicket.push(...action.payload.tickets)
        }
        if (!action.payload.stop) {
          state.rec = !state.rec
        }
      })
      .addCase(fetchTicket.rejected, (state) => {
        state.rec = !state.rec
      })
  },
})

export const { sortedTickets, filterTickets } = ticketsReducer.actions
export default ticketsReducer.reducer
