import { authors } from "../data/authors";
import { books } from "../data/books";
import { genres } from "../data/genres";
import * as bookService from "../services/bookService";
import e, { Request, Response } from "express";

// Контроллер для получения всех книг
export const getAllBooks = (req: Request, res: Response) => {
  const year = req.query.year ? Number(req.query.year) : undefined;
  const author = req.query.author ? String(req.query.author) : undefined;

  if (year !== undefined && Number.isNaN(year)) {
    return res.status(400).json({ message: "Invalid year query parameter" });
  }

  const books = bookService.getAllBooks(year, author);
  return res.json(books);
};

// Контроллер для получения книги по id
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

// Контроллер для создания новой книги
export const createBook = (req: Request, res: Response) => {
  const bookData = req.body;
  const newBook = bookService.createBook(bookData);
  return res.status(201).json(newBook);
};

// Контроллер для обновления книги по id
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

// Контроллер для удаления книги по id
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
