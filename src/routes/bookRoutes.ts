import { Router } from "express";
import * as bookController from "../controllers/bookController";
import * as reviewController from "../controllers/reviewController";

// роутер для книг
const router = Router();

// маршруты для книг
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

// маршруты для отзывов
router.get("/:bookId/reviews", reviewController.getReviewsByBookId);
router.post("/:bookId/reviews", reviewController.createReview);
router.get("/:bookId/average-rating", reviewController.getAverageRating);

// экспорт роутер для использования в других частях приложения
export default router;