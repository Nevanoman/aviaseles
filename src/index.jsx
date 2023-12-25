import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './components/store/index'

import App from './components/app'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
