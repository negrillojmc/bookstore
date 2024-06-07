import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Saving a New Book
router.post('/', async (request, response) => {
    try {
        if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
    ) {
       return response.status(400).send({
        message: 'Send all request to all required fields: title, author, publishYear',
       });
    }
   
    const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
    };
    
    const book = await Book.create(newBook);

    return response.status(201).send(book);

}
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Route to get all books from Database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    }
    catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

// Route to get one book from database by ID
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    }
    catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

// Route for Updating a Book
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found.'});
        }

        return response.status(200).send({ message: 'Book updated successfully.'});
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: err.message });
    }
})

// Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found.' })
        }

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
})

export default router;