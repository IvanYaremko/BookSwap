import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Book } from '../models/Book';
import NavBar from './NavBar';
import BookDashboard from '../../features/dashboard/BookDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    agent.Books.list().then(response => {
      setBooks(response)
      setLoading(false)
    })
  }, [])

  function handleSelectedBook(id: string) {
    setSelectedBook(books.find(book => book.id === id))
  }

  function handleCancelSelectBook() {
    setSelectedBook(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedBook(id) : handleCancelSelectBook()
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreateOrEditBook(book: Book) {
    setSubmitting(true)
    if (book.id) {
      agent.Books.update(book).then(() => {
        setBooks([...books.filter(x => x.id !== book.id), book])
        setSelectedBook(book)
        setEditMode(false)
        setSubmitting(false)
      })
    } else {
      book.id = uuid()
      agent.Books.create(book).then(() => {
        setBooks([...books, book])
        setSelectedBook(book)
        setEditMode(false)
        setSubmitting(false)
      })
    }
  }

  function handleDeleteBook(id: string) {
    setSubmitting(true)
    agent.Books.delete(id).then(() => {
      setBooks([...books.filter(x => x.id !== id)])
      setSubmitting(false)
    })
  }

  if(loading) return <LoadingComponent content='loading app' />

  return (
    <>
      <NavBar openForm={ handleFormOpen}/>
      <Container style={{ marginTop: '10em' }}>
        <BookDashboard
          books={books}
          selectedBook={selectedBook}
          selectBook={handleSelectedBook}
          cancelSelectBook={handleCancelSelectBook}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditBook}
          deleteBook={handleDeleteBook}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
