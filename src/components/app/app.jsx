import classes from './app.module.scss'
import Filter from '../filter'
import Tabs from '../tabs'
import Header from '../header/header'
import ListTickets from '../list-tickets'

function App() {
  return (
    <div>
      <Header />
      <section className={classes.content}>
        <Filter />
        <div>
          <Tabs />
          <ListTickets />
        </div>
      </section>
    </div>
  )
}
export default App
