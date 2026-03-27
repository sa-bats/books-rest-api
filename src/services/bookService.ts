import type { Book } from "../models/book";
import { books } from "../data/books";

// функция для получения всех книг
export function getAllBooks() {
    return books;
};

// функция для получения книги по id
export function getBookById(id: number): Book | undefined {
    return books.find((book) => book.id === id);
};

// функция для создания новой книги
export function createBook(book: Book) {
    const newBook = {
        ...book,
        id: books.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    books.push(newBook);
    return newBook;
}

// функция для обновления книги по id
export function updateBook(id: number, updatedBook: Partial<Book>) {
    // Найти индекс книги по id
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
        return false; // Если книга не найдена, вернуть false
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
}

// функция для удаления книги по id
export function deleteBook(id: number) {
    // Найти индекс книги по id
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
        return false;  // Если книга не найдена, вернуть false
    }
    // Удалить книгу из массива
    books.splice(bookIndex, 1);
    return true;
}