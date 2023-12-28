import { useSelector, useDispatch } from 'react-redux'
import classes from './tabs.module.scss'
import { toggleSorting } from '../store/slice-tabsReducer'

function Tabs() {
  const tabActive = useSelector((state) => state.tabs.tabs)
  const dispatch = useDispatch()

  const transferOptions = ['Самый дешевый', 'Самый быстрый', 'Оптимальный']

  const toggle = (transferOption) => {
    dispatch(toggleSorting(transferOption))
  }

  const addClassName = (text) => {
    if (tabActive === text) {
      return `${classes.buttonTab} ${classes.active}`
    }
    return classes.buttonTab
  }
  return (
    <div className={classes.tabs}>
      {transferOptions.map((option) => (
        <button key={option} type="button" className={addClassName(option)} onClick={() => toggle(option)}>
          {option}
        </button>
      ))}
    </div>
  )
}
export default Tabs
