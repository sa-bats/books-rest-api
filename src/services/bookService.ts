import type { Book } from "../models/book";
import { books } from "../data/books";

// функция для получения всех книг
export const getAllBooks = (year?: number) => {
  let filteredBooks = books;

  if (year !== undefined) {
    filteredBooks = filteredBooks.filter((book) => {
      return book.publishedYear === year;
    });
  }

  return filteredBooks;
};

// функция для получения книги по id
export const getBookById = (id: number): Book | undefined => {
    return books.find((book) => book.id === id);
};

// тип для входных данных при создании книги, исключая поля id, createdAt и updatedAt
type CreateBookInput = Omit<Book, "id" | "createdAt" | "updatedAt">;

// функция для создания новой книги
export const createBook = (book: CreateBookInput) => {
    // Найти максимальный id среди существующих книг, чтобы назначить новый id
    const maxId = books.length > 0
        ? Math.max(...books.map(b => b.id))
        : 0;
    // Создать новый объект книги, добавив id, createdAt и updatedAt
    const newBook: Book = {
        id: maxId + 1,
        ...book,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    // Добавить новую книгу в массив
    books.push(newBook);
    return newBook;
};

// функция для обновления книги по id
export const updateBook = (id: number, updatedBook: Partial<Book>) => {
    // Найти индекс книги по id
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
        return null; // Если книга не найдена, вернуть null
    }
    const book = books[bookIndex];
    // Создать новый объект книги, объединяя существующую книгу и обновленные поля
    const newBook = {
        ...book,
        ...updatedBook,
        updatedAt: new Date().toISOString(),
    };
    // Обновить книгу в массиве
    books[bookIndex] = newBook;
    return newBook;
};

// функция для удаления книги по id
export const deleteBook = (id: number) => {
    // Найти индекс книги по id
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
        return null;  // Если книга не найдена, вернуть null
    }
    // Удалить книгу из массива
    books.splice(bookIndex, 1);
    return true;
};

