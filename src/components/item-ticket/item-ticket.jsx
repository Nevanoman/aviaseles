import PropTypes from 'prop-types'
import { add, format } from 'date-fns'
import Logo from './S7 Logo.png'
import classes from './item-ticket.module.scss'

function ItemTicket({ carrier, price, segments }) {
  const formatTime = (data, m) => {
    const startTime = format(data, 'HH:mm')
    const newData = add(data, {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: m,
      minutes: 0,
      seconds: 0,
    })
    const endTime = format(newData, 'HH:mm')
    return `${String(startTime)} - ${String(endTime)}`
  }

  const transformTime = (min) => {
    const hours = Math.floor(min / 60)
    const remainingMinutes = min % 60
    return `${hours}ч ${remainingMinutes}м`
  }

  const numberTransfers = (arr) => {
    const num = arr.length
    if (num === 0) {
      return '0 пересадок'
    }
    if (num === 1) {
      return '1 пересадка'
    }
    if (num === 2 || num === 3) {
      return `${num} пересадки`
    }
    return ''
  }

  return (
    <div className={classes.ticket}>
      <div className={classes['price-ticket']}>{`${String(price).slice(0, -3)} ${String(price).slice(-3)}`} P</div>
      <img src={Logo} alt={carrier} className={classes['logo-ticket']} />
      <div className={classes.container}>
        <div>
          <div className={classes.title}>{`${segments[0].origin}-${segments[0].destination}`}</div>
          <div className={classes.information}>{formatTime(segments[0].date, segments[0].duration)}</div>
        </div>
        <div>
          <div className={classes.title}>В пути</div>
          <div className={classes.information}>{transformTime(segments[0].duration)}</div>
        </div>
        <div>
          <div className={classes.title}>{numberTransfers(segments[0].stops)}</div>
          <div className={classes.information}>{segments[0].stops.join(', ')}</div>
        </div>
      </div>
      <div className={classes.container}>
        <div>
          <div className={classes.title}>{`${segments[1].origin}-${segments[1].destination}`}</div>
          <div className={classes.information}>{formatTime(segments[1].date, segments[1].duration)}</div>
        </div>
        <div>
          <div className={classes.title}>В пути</div>
          <div className={classes.information}>{transformTime(segments[1].duration)}</div>
        </div>
        <div>
          <div className={classes.title}>{numberTransfers(segments[1].stops)}</div>
          <div className={classes.information}>{segments[1].stops.join(', ')}</div>
        </div>
      </div>
    </div>
  )
}

ItemTicket.propTypes = {
  carrier: PropTypes.string,
  price: PropTypes.number,
  segments: PropTypes.arrayOf(PropTypes.string),
}

ItemTicket.defaultProps = {
  carrier: '',
  price: 0,
  segments: [],
}

export default ItemTicket
