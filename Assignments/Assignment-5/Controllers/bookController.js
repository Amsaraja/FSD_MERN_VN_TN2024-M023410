// controllers/bookController.js
const Book = require('../Models/bookModel.js');

// Add a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, publishedYear, genre } = req.body;
    if (!title || !author || !publishedYear || !genre) {
      return res.status(400).json({ message: 'All fields are required: title, author, publishedYear, genre' });
    }
    const newBook = new Book({ title, author, publishedYear, genre });
    const saved = await newBook.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all books (with optional genre filter and sorting by publishedYear)
exports.getBooks = async (req, res) => {
  try {
    const { genre, sort } = req.query; // e.g. /books?genre=Fiction&sort=desc
    const filter = {};
    if (genre) filter.genre = genre;

    // default ascending; allow sort=desc for descending
    const sortOrder = (sort && sort.toLowerCase() === 'desc') ? -1 : 1;

    const books = await Book.find(filter).sort({ publishedYear: sortOrder });
    return res.json(books);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    return res.json(book);
  } catch (err) {
    console.error(err);
    // If invalid ObjectId, return 400
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update book by ID
exports.updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await Book.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete book by ID
exports.deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Book.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Book not found' });
    return res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
