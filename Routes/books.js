import express from 'express';
import pgclient from '../db.js';

const bookRoutes = express.Router();

// GET all books
bookRoutes.get('/', async (req, res) => {
  const result = await pgclient.query('SELECT * FROM books;');
  res.json(result.rows);
});




// GET a book by ID
bookRoutes.get('/:id', async (req, res) => {
  const result = await pgclient.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(result.rows[0]);
});





// POST new book
bookRoutes.post('/', async (req, res) => {
  const { title, author, year } = req.body;
  const result = await pgclient.query(
    'INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *',
    [title, author, year]
  );
  res.status(201).json(result.rows[0]);
});

// PUT update book
bookRoutes.put('/:id', async (req, res) => {
  const { title, author, year } = req.body;
  const result = await pgclient.query(
    'UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4 RETURNING *',
    [title, author, year, req.params.id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(result.rows[0]);
});

// DELETE a book
bookRoutes.delete('/:id', async (req, res) => {
  const result = await pgclient.query('DELETE FROM books WHERE id = $1 RETURNING *', [req.params.id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.sendStatus(204);
});

export default bookRoutes;
