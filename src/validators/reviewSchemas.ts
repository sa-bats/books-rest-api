import { z } from "zod";

export const createReviewSchema = z.object({
  userName: z.string().min(1, "User name is required"),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});