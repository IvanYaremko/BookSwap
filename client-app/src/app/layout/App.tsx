import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import BookForm from '../../features/form/BookForm';
import BookDetails from '../../features/details/BookDetails';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import IsbnForm from '../../features/form/IsbnForm';
import { useStore } from '../stores/Store';
import LoadingComponent from './LoadingComponent';
import LoginForm from '../../features/auth/LoginForm';
import RegisterForm from '../../features/auth/RegisterForm';
import MarketDashboard from '../../features/dashboards/market/MarketDashboard';
import SwapDashboard from '../../features/dashboards/swap/SwapDashboard';
import RequestorBookList from '../../features/dashboards/swap/RequestorBookList';
import ProfileDashboard from '../../features/dashboards/profile/ProfileDashboard';
import SwapHistoryDashboard from '../../features/dashboards/history/SwapHistoryDashboard';

function App() {
  const location = useLocation()
  const { commonStore, userStore } = useStore()
  
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setApplicationLoaded(true))
    } else {
      commonStore.setApplicationLoaded(true)
    }
  }, [commonStore, userStore])

  if(!commonStore.applicationLoaded) return <LoadingComponent content='loading application'/>

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/register' component={RegisterForm} />
      <Route
        path={['/books', '/books/:id', '/edit/:id', '/edit', '/createBook', '/server-error', '/profile/:id', '/not-found', '/swaps', '/requestor/:id', '/history']}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '10em' }}>
              <Switch>
                <Route exact path='/books' component={MarketDashboard} />
                <Route path='/books/:id' component={BookDetails} />
                <Route key={location.key} path={['/edit/:id','/edit',]} component={BookForm} />
                <Route path={'/createBook'} component={IsbnForm} />
                <Route path={'/profile/:id'} component={ProfileDashboard} />
                <Route path={'/requestor/:id'} component={RequestorBookList} />
                <Route path={'/swaps'} component={SwapDashboard} />
                <Route path={'/history'} component={SwapHistoryDashboard}/>
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
