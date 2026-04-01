import { Request, Response } from "express";
import * as reviewService from "../services/reviewService";
import { createReviewSchema } from "../validators/reviewSchemas";

// Контроллер для получения всех отзывов по id книги
export const getReviewsByBookId = (req: Request, res: Response) => {
    const bookId = Number(req.params.bookId);
    if (Number.isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid book id" });
    }
    const reviews = reviewService.getReviewsByBookId(bookId);
    return res.json(reviews);
};

// Контроллер для создания нового отзыва
export const createReview = (req: Request, res: Response) => {
    const bookId = Number(req.params.bookId);
    if (Number.isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid book id" });
    }
    const parsed = createReviewSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: parsed.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }
    const newReview = reviewService.createReview({ ...parsed.data, bookId, comment: parsed.data.comment || "" });
    return res.status(201).json(newReview);
};

// Контроллер для получения среднего рейтинга книги
export const getAverageRating = (req: Request, res: Response) => {
    const bookId = Number(req.params.bookId);
    if (Number.isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid book id" });
    }
    const averageRating = reviewService.getAverageRating(bookId);
    if (averageRating === null) {
    return res.status(404).json({ message: "No reviews found for this book" });
}
    return res.json({ averageRating });
};