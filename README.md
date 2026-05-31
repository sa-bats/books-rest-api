# Books REST API

## Authors

- Samuil Batšinski

## Prerequisites

- Node.js 18 or higher

No separate database installation required. `npx prisma dev` handles the PostgreSQL database automatically.

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma 7
- PostgreSQL (managed via `npx prisma dev`)
- Zod

## Setup

1. Install dependencies:

   npm install

2. Start the local Prisma Postgres server (keep this terminal running):

   npx prisma dev

3. Apply the database schema (in a new terminal):

   npx prisma db push

4. Seed the database with initial data:

   npx prisma db seed

5. Start the development server:

   npm run dev

The API will be available at http://localhost:3000

## Endpoints

### Books

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/v1/books | Get all books |
| GET | /api/v1/books/:id | Get book by ID |
| POST | /api/v1/books | Create a book |
| PUT | /api/v1/books/:id | Update a book |
| DELETE | /api/v1/books/:id | Delete a book |

#### Query parameters for GET /api/v1/books

| Parameter | Type | Description |
|-----------|------|-------------|
| year | number | Filter by published year |
| author | string | Filter by author name |
| genre | string | Filter by genre name |
| sortBy | string | Sort by: title or publishedYear |
| order | string | asc or desc (default: asc) |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

### Reviews

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/v1/books/:bookId/reviews | Get reviews for a book |
| POST | /api/v1/books/:bookId/reviews | Create a review |
| GET | /api/v1/books/:bookId/average-rating | Get average rating |

## Response Formats

### Paginated books list

```json
{
  "data": [
    {
      "id": 1,
      "title": "Crime and Punishment",
      "isbn": "9780140449136",
      "publishedYear": 1866,
      "pageCount": 720,
      "language": "English",
      "description": "...",
      "authorId": 1,
      "publisherId": 1,
      "author": { "id": 1, "firstName": "Fyodor", "lastName": "Dostoevsky" },
      "publisher": { "id": 1, "name": "Penguin Books" },
      "genres": [{ "id": 1, "name": "Classic Literature" }]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 12,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Validation error (400)

```json
{
  "error": "Validation failed",
  "details": [
    { "field": "isbn", "message": "ISBN is required" },
    { "field": "publishedYear", "message": "Expected number, received string" }
  ]
}
```

### Not found error (404)

```json
{
  "error": "Book not found"
}
```

## Examples

### Get all books
```
curl http://localhost:3000/api/v1/books
```

### Filter by author, sort and paginate
```
curl "http://localhost:3000/api/v1/books?author=Dostoevsky&sortBy=publishedYear&order=desc&page=1&limit=5"
```

### Filter by genre
```
curl "http://localhost:3000/api/v1/books?genre=Classic%20Literature"
```

### Get book by ID
```
curl http://localhost:3000/api/v1/books/1
```

### Create a book
```
curl -X POST http://localhost:3000/api/v1/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Gambler",
    "isbn": "9780140449150",
    "publishedYear": 1867,
    "pageCount": 192,
    "language": "English",
    "description": "A short novel about a young tutor addicted to gambling.",
    "authorId": 1,
    "publisherId": 1,
    "genres": [1, 2]
  }'
```

### Update a book
```
curl -X PUT http://localhost:3000/api/v1/books/1 \
  -H "Content-Type: application/json" \
  -d '{ "pageCount": 730 }'
```

### Delete a book
```
curl -X DELETE http://localhost:3000/api/v1/books/1
```

### Get reviews for a book
```
curl http://localhost:3000/api/v1/books/1/reviews
```

### Create a review
```
curl -X POST http://localhost:3000/api/v1/books/1/reviews \
  -H "Content-Type: application/json" \
  -d '{ "userName": "Alice", "rating": 5, "comment": "Masterpiece!" }'
```

### Get average rating
```
curl http://localhost:3000/api/v1/books/1/average-rating
```

## AI Usage

### Part 1

ChatGPT was used for initial development. The full assignment was provided as context,
and additional questions were asked on specific topics:

- how to set up Express with TypeScript
- how to structure a REST API project
- how to implement Zod validation in Express
- how to handle errors with middleware
- how to implement filtering, sorting and pagination

Claude Code was used for code review and identifying improvements
(error handling edge cases, ISBN duplicate check, type safety).

### Part 2

Claude Code was used for planning and understanding of the Prisma integration:
schema design, migrations, seed script, rewriting services with Prisma queries,
and error handling for Prisma errors.

Prompt used for planning:

"You are a code reviewer and planner helping me complete a university REST API assignment.
Review my code, check git history, give structured feedback, then create a step by step
plan for Part 2 (PostgreSQL integration with Prisma)."
