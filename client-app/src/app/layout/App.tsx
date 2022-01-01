import React, { useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import BookDashboard from '../../features/dashboard/BookDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/Store';
import { observer } from 'mobx-react-lite';

function App() {
  const {bookStore} = useStore()

  useEffect(() => {
    bookStore.loadBooks()
  }, [bookStore])

  if(bookStore.loadingInitial) return <LoadingComponent content='loading app' />

  return (
    <>
      <NavBar/>
      <Container style={{ marginTop: '10em' }}>
        <BookDashboard/>
      </Container>
    </>
  );
}

export default observer(App);
