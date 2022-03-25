const express = require("express");
const booksRouter = express.Router();
const booksController = require('../controllers/controller-books')

booksRouter.get("/", booksController.getBooks)

booksRouter.get("/:id", booksController.getBookById);

booksRouter.post("/", booksController.addBook)


module.exports = booksRouter;
