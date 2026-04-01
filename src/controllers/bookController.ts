import * as bookService from "../services/bookService";
import { Request, Response, NextFunction } from "express";
import { createBookSchema, updateBookSchema } from "../validators/bookSchemas";
import { AppError } from "../utils/AppError";

// Контроллер для получения всех книг
export const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  const year = req.query.year ? Number(req.query.year) : undefined;
  const author = req.query.author ? String(req.query.author) : undefined;
  const genre = req.query.genre ? String(req.query.genre) : undefined;
  const sortBy = req.query.sortBy ? String(req.query.sortBy) : undefined;
  const order = req.query.order ? String(req.query.order) : undefined;
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  if (year !== undefined && Number.isNaN(year)) {
    return next(new AppError("Invalid year query parameter", 400));
  }

  if (sortBy !== undefined && sortBy !== "title" && sortBy !== "publishedYear") {
    return next(new AppError("Invalid sortBy query parameter", 400));
  }

  if (order !== undefined && order !== "asc" && order !== "desc") {
    return next(new AppError("Invalid order query parameter", 400));
  }

  if (Number.isNaN(page) || page < 1) {
    return next(new AppError("Invalid page query parameter", 400));
  }

  if (Number.isNaN(limit) || limit < 1) {
    return next(new AppError("Invalid limit query parameter", 400));
  }

  const result = bookService.getAllBooks(year, author, genre, sortBy, order, page, limit);
  return res.json(result);
};

// Контроллер для получения книги по id
export const getBookById = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("Invalid book id", 400));
  }

  const book = bookService.getBookById(id);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  return res.json(book);
};

// Контроллер для создания новой книги
export const createBook = (req: Request, res: Response, next: NextFunction) => {
  const parsed = createBookSchema.safeParse(req.body);

  if (!parsed.success) {
    return next(new AppError("Validation failed", 400));
  }

  const newBook = bookService.createBook(parsed.data);
  return res.status(201).json(newBook);
};

// Контроллер для обновления книги по id
export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("Invalid book id", 400));
  }

  const parsed = updateBookSchema.safeParse(req.body);

  if (!parsed.success) {
    return next(new AppError("Validation failed", 400));
  }

  const updatedBook = bookService.updateBook(id, parsed.data);

  if (!updatedBook) {
    return next(new AppError("Book not found", 404));
  }

  return res.json(updatedBook);
};

// Контроллер для удаления книги по id
export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(new AppError("Invalid book id", 400));
  }

  const deletedBook = bookService.deleteBook(id);

  if (!deletedBook) {
    return next(new AppError("Book not found", 404));
  }

  return res.json({ message: "Book deleted successfully" });
};