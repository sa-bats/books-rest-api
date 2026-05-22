import { prisma } from "../lib/prisma";

export const getReviewsByBookId = async (bookId: number) => {
  return prisma.review.findMany({ where: { bookId } });
};

export const createReview = async (data: {
  bookId: number;
  userName: string;
  rating: number;
  comment?: string;
}) => {
  return prisma.review.create({ data });
};

export const getAverageRating = async (bookId: number) => {
  const result = await prisma.review.aggregate({
    where: { bookId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  if (result._count.rating === 0) return null;
  return Number(result._avg.rating?.toFixed(2));
};
