import * as bookService from "../services/bookService";
import { Request, Response } from "express";

export const getAllBooks = (req: Request, res: Response) => {
  const books = bookService.getAllBooks();
  res.json(books);
};

export const getBookById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid book id" });
  }
  const book = bookService.getBookById(id);
  if (book) {
    return res.json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
};

export const createBook = (req: Request, res: Response) => {
  const bookData = req.body;
  const newBook = bookService.createBook(bookData);
  return res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid book id" });
    }
    const updatedData = req.body;
    const updatedBook = bookService.updateBook(id, updatedData);
    if (updatedBook) {
        return res.json(updatedBook);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
};

export const deleteBook = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid book id" });
    }
    const deletedBook = bookService.deleteBook(id);
    if (deletedBook) {
        return res.json({ message: "Book deleted successfully" });
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
};
