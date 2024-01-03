import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledDiv = styled('div')({
  padding: '20px',
  '& > div': {
    marginBottom: '10px',
  },
  '& button': {
    marginTop: '10px',
  },
});

function BookEdit({ bookId }) {
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    axios.get('/api-v1/book/get/' + bookId)
      .then(response => {
        setBook(response.data);
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setGenre(response.data.genre);
      })
      .catch(error => {
        alert('Error fetching book data:', error);
      });
  }, [bookId]);

  const handleUpdate = () => {
    const updatedBook = {
      ...book,
      author,
      title,
      genre
    };

    axios.post('/api-v1/book/modify/' + bookId, updatedBook)
      .then(() => {
        alert('Book updated successfully');
      })
      .catch(error => {
        alert('Error updating book:', error);
      });
  };

  return (
    <StyledDiv>
      <h1>Edit Book</h1>
      <div>
        <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth />
      </div>
      <div>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
      </div>
      <div>
        <TextField label="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} fullWidth />
      </div>
      <Button variant="contained" onClick={handleUpdate} fullWidth>
        Update
      </Button>
      <a href='/'>Home page</a>
    </StyledDiv>
  );
}

export default BookEdit;