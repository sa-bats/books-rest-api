import { z } from "zod";

// Схема для создания книги
export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isbn: z.string().min(1, "ISBN is required"),
  publishedYear: z.number(),
  pageCount: z.number().int().positive(),
  language: z.string().min(1, "Language is required"),
  description: z.string().min(1, "Description is required"),
  coverImage: z.string().optional(),
  authorId: z.number().int().positive(),
  publisherId: z.number().int().positive(),
  genres: z.array(z.number().int().positive()).min(1, "At least one genre is required"),
});

// Схема для обновления книги
export const updateBookSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  isbn: z.string().min(1, "ISBN is required").optional(),
  publishedYear: z.number().int().optional(),
  pageCount: z.number().int().positive().optional(),
});