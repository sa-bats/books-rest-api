import express from "express";

// создает сервер
const app = express();

// чтобы сервер понимал JSON
app.use(express.json());

// тестовый маршрут
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;