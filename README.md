# Books REST API

## Authors

- Samuil Batšinski

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
