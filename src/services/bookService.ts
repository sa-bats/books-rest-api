import type { Book } from "../models/book";
import { books } from "../data/books";

// функция для получения всех книг
export const getAllBooks = () => {
    return books;
};

// функция для получения книги по id
export const getBookById = (id: number): Book | undefined => {
    return books.find((book) => book.id === id);
};

// функция для создания новой книги
export const createBook = (book: Book) => {
    // Найти максимальный id среди существующих книг
    const maxId = books.length > 0                  // Проверяем, есть ли книги в массиве
        ? Math.max(...books.map(book => book.id))   // Находим максимальный id
        : 0;    // Если массив книг пустой, начинаем с id 1

    // Создать новый объект книги, добавив id и timestamps
    const newBook = {
        ...book,        // Копируем все поля из переданного объекта book
        id: maxId + 1,  // Устанавливаем id как максимальный id + 1
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

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