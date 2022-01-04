import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import BookDashboard from '../../features/dashboard/BookDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import BookForm from '../../features/form/BookForm';
import BookDetails from '../../features/details/BookDetails';

function App() {
  const location = useLocation()

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '10em' }}>
              <Route exact path='/books' component={BookDashboard} />
              <Route path='/books/:id' component={BookDetails} />
              <Route key={location.key} path={['/createBook', '/edit/:id']} component={BookForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
