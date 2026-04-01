import { authors } from "../data/authors";
import { books } from "../data/books";
import { genres } from "../data/genres";
import * as bookService from "../services/bookService";
import e, { Request, Response } from "express";

// Контроллер для получения всех книг
export const getAllBooks = (req: Request, res: Response) => {
  const year = req.query.year ? Number(req.query.year) : undefined;
  const author = req.query.author ? String(req.query.author) : undefined;
  const genre = req.query.genre ? String(req.query.genre) : undefined;
  const sortBy = req.query.sortBy ? String(req.query.sortBy) : undefined;
  const order = req.query.order ? String(req.query.order) : undefined;
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  if (year !== undefined && Number.isNaN(year)) {
    return res.status(400).json({ message: "Invalid year query parameter" });
  }

  if (sortBy !== undefined && sortBy !== "title" && sortBy !== "publishedYear") {
    return res.status(400).json({ message: "Invalid sortBy query parameter" });
  }

  if (order !== undefined && order !== "asc" && order !== "desc") {
    return res.status(400).json({ message: "Invalid order query parameter" });
  }

  if (Number.isNaN(page) || page < 1) {
    return res.status(400).json({ message: "Invalid page query parameter" });
  }

  if (Number.isNaN(limit) || limit < 1) {
    return res.status(400).json({ message: "Invalid limit query parameter" });
  }

  const result = bookService.getAllBooks(year, author, genre, sortBy, order, page, limit);
  return res.json(result);
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
