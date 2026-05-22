import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";
import * as bookService from "../services/bookService";
import { createReviewSchema } from "../validators/reviewSchemas";
import { AppError } from "../utils/AppError";

export const getReviewsByBookId = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = Number(req.params.bookId);
  if (Number.isNaN(bookId)) {
    return next(new AppError("Invalid book id", 400));
  }

  const book = await bookService.getBookById(bookId);
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  const reviews = await reviewService.getReviewsByBookId(bookId);
  return res.json(reviews);
};

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = Number(req.params.bookId);
  if (Number.isNaN(bookId)) {
    return next(new AppError("Invalid book id", 400));
  }

  const book = await bookService.getBookById(bookId);
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  const parsed = createReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return next(new AppError("Validation failed", 400, details));
  }

  const newReview = await reviewService.createReview({ ...parsed.data, bookId });
  return res.status(201).json(newReview);
};

export const getAverageRating = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = Number(req.params.bookId);
  if (Number.isNaN(bookId)) {
    return next(new AppError("Invalid book id", 400));
  }

  const book = await bookService.getBookById(bookId);
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  const averageRating = await reviewService.getAverageRating(bookId);
  return res.json({ averageRating });
};
