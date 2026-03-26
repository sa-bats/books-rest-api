import express from "express";
import bookRoutes from "./routes/bookRoutes";

// создает сервер
const app = express();

// чтобы сервер понимал JSON
app.use(express.json());

// тестовый маршрут
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/books", bookRoutes);

export default app;