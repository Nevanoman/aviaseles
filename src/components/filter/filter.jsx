import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import classes from './filter.module.scss'

import { toggleFilter, removeFilter } from '../store/sliсe-filterReducer'
import { filterTickets } from '../store/slice-ticketReducer'

function Filter() {
  const filter = useSelector((state) => state.filter.filter)
  const dispatch = useDispatch()
  const [allChecked, setAllChecked] = useState(false)

  const transferOptions = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки']

  useEffect(() => {
    dispatch(filterTickets(filter))
  }, [filter, dispatch])

  const toggle = (e, transferOption) => {
    const textContent = transferOption.trim()

    if (textContent === 'Все') {
      const newAllChecked = e.target.checked
      setAllChecked(newAllChecked)

      transferOptions.slice(1).forEach((option) => {
        dispatch(newAllChecked ? toggleFilter(option) : removeFilter(option))
      })
    } else {
      const updatedFilter = e.target.checked
        ? [...filter, textContent]
        : filter.filter((option) => option !== textContent)

      setAllChecked(transferOptions.slice(1).every((option) => updatedFilter.includes(option)))

      dispatch(e.target.checked ? toggleFilter(textContent) : removeFilter(textContent))
    }
  }

  return (
    <div className={classes.filter}>
      <div className={classes['label-filter']}>Количество пересадок</div>

      <label className={classes['input-filter']}>
        <input
          className={classes['check-input']}
          type="checkbox"
          onChange={(e) => toggle(e, 'Все')}
          checked={allChecked}
        />
        <span className={classes['check-box']} />
        Все
      </label>

      {transferOptions.slice(1).map((option) => (
        <label key={option} className={classes['input-filter']}>
          <input
            className={classes['check-input']}
            type="checkbox"
            onChange={(e) => toggle(e, option)}
            checked={filter.includes(option)}
          />
          <span className={classes['check-box']} />
          {option}
        </label>
      ))}
    </div>
  )
}
export default Filter
