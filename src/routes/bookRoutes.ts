import { Router } from "express";
import * as bookController from "../controllers/bookController";

// роутер для книг
const router = Router();

// маршруты с контроллерами
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

// экспорт роутер для использования в других частях приложения
export default router;