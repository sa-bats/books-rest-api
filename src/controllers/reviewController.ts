import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";
import * as bookService from "../services/bookService";
import { createReviewSchema } from "../validators/reviewSchemas";
import { AppError } from "../utils/AppError";

// Контроллер для получения всех отзывов по id книги
export const getReviewsByBookId = (req: Request, res: Response, next: NextFunction) => {
    const bookId = Number(req.params.bookId);
    if (Number.isNaN(bookId)) {
        return next(new AppError("Invalid book id", 400));
    }
    const reviews = reviewService.getReviewsByBookId(bookId);
    return res.json(reviews);
};

// Контроллер для создания нового отзыва
export const createReview = (req: Request, res: Response, next: NextFunction) => {
    const bookId = Number(req.params.bookId);
    if (Number.isNaN(bookId)) {
        return next(new AppError("Invalid book id", 400));
    }

    const book = bookService.getBookById(bookId);
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

    const newReview = reviewService.createReview({ ...parsed.data, bookId, comment: parsed.data.comment ?? "" });
    return res.status(201).json(newReview);
};

// Контроллер для получения среднего рейтинга книги
export const getAverageRating = (req: Request, res: Response, next: NextFunction) => {
    const bookId = Number(req.params.bookId);
    if (Number.isNaN(bookId)) {
        return next(new AppError("Invalid book id", 400));
    }

    const book = bookService.getBookById(bookId);
    if (!book) {
        return next(new AppError("Book not found", 404));
    }

    const averageRating = reviewService.getAverageRating(bookId);
    return res.json({ averageRating });
};
