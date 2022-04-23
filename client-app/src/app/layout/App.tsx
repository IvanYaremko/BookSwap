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
import SwapHistoryDashboard from '../../features/dashboards/history/SwapHistoryDashboard';
import ProfileDashboard from '../../features/dashboards/profile/ProfileDashboard';
import SwapHistoryDetails from '../../features/dashboards/history/SwapHistoryDetails';
import PrivateRoute from './PrivateRoute';

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

  if (!commonStore.applicationLoaded) return <LoadingComponent content='loading application' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/register' component={RegisterForm} />
      <Route
        path={['/books', '/books/:id', '/edit/:id', '/edit',
          '/createBook', '/server-error', '/not-found',
          '/swaps', '/requestor/:id', '/history',
          '/profile/:username', '/history/:swapId']}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '10em' }}>
              <Switch>
                <PrivateRoute exact path='/books' component={MarketDashboard} />
                <PrivateRoute path='/books/:id' component={BookDetails} />
                <PrivateRoute key={location.key} path={['/edit/:id', '/edit',]} component={BookForm} />
                <PrivateRoute path={'/createBook'} component={IsbnForm} />
                <PrivateRoute path={'/profile/:username'} component={ProfileDashboard} />
                <PrivateRoute path={'/requestor/:id'} component={RequestorBookList} />
                <PrivateRoute path={'/swaps'} component={SwapDashboard} />
                <PrivateRoute exact path={'/history'} component={SwapHistoryDashboard} />
                <PrivateRoute path='/history/:swapId' component={SwapHistoryDetails} />
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
