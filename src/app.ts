import express from "express";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorHandler";

// создает сервер
const app = express();

// чтобы сервер понимал JSON
app.use(express.json());

app.use("/api/v1/books", bookRoutes);

app.use(errorHandler);

export default app;