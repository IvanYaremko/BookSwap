import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Book } from '../models/Book';
import NavBar from './NavBar';
import BookDashboard from '../../features/dashboard/BookDashboard';
import {v4 as uuid} from 'uuid'

function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:5000/api/books').then(response => {
      console.log(response)
      setBooks(response.data)
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
    book.id ? setBooks([...books.filter(x => x.id !== book.id), book])
      : setBooks([...books, {...book, id: uuid()}])
    
    setEditMode(false)
    setSelectedBook(book)
  }

  function handleDeleteBook(id: string) {
    setBooks([...books.filter(x => x.id !== id)])
  }

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
        />
      </Container>
    </>
  );
}

export default App;
