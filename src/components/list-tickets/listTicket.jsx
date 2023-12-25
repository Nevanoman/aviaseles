import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ItemTicket from '../item-ticket'

import { fetchId, fetchTicket, sortedTickets } from '../store/slice-ticketReducer'
import classes from './listTickets.module.scss'

function ListTickets() {
  const dispatch = useDispatch()
  const id = useSelector((state) => state.tickets.id)
  const ticketsFilter = useSelector((state) => state.tickets.ticketsFilter)
  const rec = useSelector((state) => state.tickets.rec)
  const tabs = useSelector((state) => state.tabs.tabs)
  const filter = useSelector((state) => state.filter.filter)

  useEffect(() => {
    dispatch(fetchId())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(fetchTicket(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, rec])

  useEffect(() => {
    dispatch(sortedTickets(tabs))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, tabs])

  function generateRandomId() {
    return Math.random().toString(36).substring(2)
  }

  if (filter.length === 0) {
    return (
      <div className={classes.title}>
        <h4>Рейсов, подходящих под заданные фильтры, не найдено</h4>
      </div>
    )
  }
  return (
    <div>
      {ticketsFilter.map((ticket) => (
        <ItemTicket key={generateRandomId()} carrier={ticket.carrier} price={ticket.price} segments={ticket.segments} />
      ))}
    </div>
  )
}

export default ListTickets
