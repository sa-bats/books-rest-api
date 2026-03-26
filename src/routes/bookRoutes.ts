import { Router } from "express";

const router = Router();

// тестовый маршрут
router.get("/", (req, res) => {
  res.json({ message: "Books route works" });
});

export default router;