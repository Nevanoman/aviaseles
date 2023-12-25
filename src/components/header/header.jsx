import Logo from './Logo.svg'
import classes from './header.module.scss'

function Header() {
  return (
    <div className={classes.header}>
      <img width={60} src={Logo} className={classes.logo} alt="logo" />
    </div>
  )
}
export default Header
