const bookModel = require("../models/bookModel");

const getBook = async (req, res) => {
    try {
        const books = await bookModel.find({});

        if (!books) {
            return res.status(400).json({ error: "No Book Added" });
        }

        res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await bookModel.findById(id);

        if (!book) {
            return res.status(400).json({ error: "Not Valid Id" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postBook = async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).json({ error: "Fill * Required" });
        }

        if (isNaN(publishYear)) {
            return res.status(400).json({ error: "Enter Year in Number" });
        }

        const book = await bookModel.create({
            title,
            author,
            publishYear,
        });

        return res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const putBook = async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        const { id } = req.params;

        if (!title || !author || !publishYear) {
            return res.status(400).json({ error: "Fill * Required" });
        }

        if (isNaN(publishYear)) {
            return res.status(400).json({ error: "Enter Year in Number" });
        }

        const result = await bookModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(400).json({ error: "Book not Found" });
        }

        res.status(200).json({
            data: result,
            message: "Book Updated Successfully!",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await bookModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(400).json({ error: "Book not Found" });
        }

        res.status(200).json({
            message: "Book Deleted Successfully!",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { postBook, getBook, getBookById, putBook, deleteBook };
