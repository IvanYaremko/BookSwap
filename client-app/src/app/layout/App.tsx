import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import BookDashboard from '../../features/dashboard/BookDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import BookForm from '../../features/form/BookForm';
import BookDetails from '../../features/details/BookDetails';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import IsbnForm from '../../features/form/IsbnForm';
import LoginForm from '../../features/auth/LoginForm';
import { useStore } from '../stores/Store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
  const location = useLocation()
  const { commonStore, userStore } = useStore()
  
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setApplicationLoaded())
    } else {
      commonStore.setApplicationLoaded()
    }
  }, [commonStore, userStore])

  if(!commonStore.applicationLoaded) return <LoadingComponent content='loading application'/>

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer/>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '10em' }}>
              <Switch>
                <Route exact path='/books' component={BookDashboard} />
                <Route path='/books/:id' component={BookDetails} />
                <Route key={location.key} path={['/edit/:id','/edit',]} component={BookForm} />
                <Route path={'/createBook'} component={IsbnForm} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
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
