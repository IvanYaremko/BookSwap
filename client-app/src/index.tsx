import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import App from './app/layout/App'
import './app/layout/styles.css'
import { store, StoreContext } from './app/stores/Store';
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory()

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);


