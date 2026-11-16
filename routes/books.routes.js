const express = require('express');
const BookModel = require('../models/Book.model');
require('../validators/book.validator');
const { validateCreateBook, validateUpdateBook,validateBookId, handleValidationErrors } = require('../validators/book.validator');
const router = express.Router();

router.post(
  '/', validateCreateBook, handleValidationErrors, async (req, res) => {
    try {
        const newBook = await BookModel.create(req.body);
        res.status(201).json(newBook);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
  try {
      const books = await BookModel.find();
      res.json(books);
  }catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', validateBookId, handleValidationErrors, async (req, res) => {
  try {
      const {id} = req.params;
      const book = await BookModel.findById(id);

      if (!book) {
        return res.status(404).json({ message: req.t('bookNotFound') });
      }

      res.status(200).json(book);
  }catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', validateBookId, handleValidationErrors, async (req, res) => {
  try {
      const {id} = req.params;
      const deletedBook = await BookModel.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(404).json({ message: req.t('bookNotFound') });
      }

      res.status(200).json({ message: req.t('bookDeletedSuccessfully') });
  }catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', validateBookId, handleValidationErrors, validateUpdateBook, async (req, res) => {
  try {
      
      const {id} = req.params;
      const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedBook) {
        return res.status(404).json({ message: req.t('bookNotFound') });
      }

      res.status(200).json(updatedBook);
  }catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;