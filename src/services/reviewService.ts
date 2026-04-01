import { Review } from "../models/review";

// Массив для хранения отзывов (вместо базы данных)
const reviews: Review[] = [];

// функция для получения всех отзывов по id книги
export const getReviewsByBookId = (bookId: number) => {
    return reviews.filter((review) => review.bookId === bookId);
};

// функция для создания нового отзыва
export const createReview = (review: Omit<Review, "id" | "createdAt" >) => {
    // Найти максимальный id среди существующих отзывов, чтобы назначить новый id
    const maxId = reviews.length > 0
        ? Math.max(...reviews.map(r => r.id))
        : 0;
    // Создать новый объект отзыва, добавив id, createdAt и updatedAt
    const newReview: Review = {
        id: maxId + 1,
        ...review,
        createdAt: new Date().toISOString(),
    };
    // Добавить новый отзыв в массив
    reviews.push(newReview);
    return newReview;
};

export const getAverageRating = (bookId: number) => {
    const bookReviews = getReviewsByBookId(bookId);
    if (bookReviews.length === 0) {
        return null; // Если нет отзывов, вернуть null
    }
    const totalRating = bookReviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / bookReviews.length).toFixed(2));
};