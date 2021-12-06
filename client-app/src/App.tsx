import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/books').then(response => {
      console.log(response)
      setBooks(response.data)
    })
  }, [])

  return (
    <div className="App">
      <Header as='h2' icon='book' content='BookSwap' />
      <List>
        {books.map((book: any) => (
          <List.Item key={book.id}> {book.title} </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
