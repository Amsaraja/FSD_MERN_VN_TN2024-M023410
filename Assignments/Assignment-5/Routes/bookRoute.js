// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../Controllers/bookController.js');

// POST /books  -> create a new book
router.post('/', controller.createBook);

// GET /books -> get all books (supports ?genre=xyz and ?sort=asc|desc)
router.get('/', controller.getBooks);

// GET /books/:id -> get a book by id
router.get('/:id', controller.getBookById);

// PUT /books/:id -> update a book by id
router.put('/:id', controller.updateBookById);

// DELETE /books/:id -> delete a book by id
router.delete('/:id', controller.deleteBookById);

module.exports = router;
