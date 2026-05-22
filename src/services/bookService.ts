import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

type CreateBookInput = {
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  description: string;
  coverImage?: string;
  authorId: number;
  publisherId: number;
  genres: number[];
};

const bookInclude = {
  author: true,
  publisher: true,
  genres: true,
} as const;

export const getAllBooks = async (
  year?: number,
  author?: string,
  genre?: string,
  sortBy?: string,
  order: string = "asc",
  page: number = 1,
  limit: number = 10
) => {
  const where: Prisma.BookWhereInput = {};

  if (year !== undefined) {
    where.publishedYear = year;
  }

  if (author !== undefined) {
    const nameParts = author.trim().split(/\s+/);
    if (nameParts.length > 1) {
      where.author = {
        firstName: { equals: nameParts[0], mode: "insensitive" },
        lastName: { equals: nameParts.slice(1).join(" "), mode: "insensitive" },
      };
    } else {
      where.author = {
        lastName: { equals: nameParts[0], mode: "insensitive" },
      };
    }
  }

  if (genre !== undefined) {
    where.genres = { some: { name: { equals: genre, mode: "insensitive" } } };
  }

  const orderBy: Prisma.BookOrderByWithRelationInput | undefined = sortBy
    ? { [sortBy]: order as Prisma.SortOrder }
    : undefined;

  const [totalItems, data] = await Promise.all([
    prisma.book.count({ where }),
    prisma.book.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: bookInclude,
    }),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export const getBookById = async (id: number) => {
  return prisma.book.findUnique({ where: { id }, include: bookInclude });
};

export const getBookByIsbn = async (isbn: string) => {
  return prisma.book.findUnique({ where: { isbn } });
};

export const createBook = async (data: CreateBookInput) => {
  const { genres, ...bookData } = data;
  return prisma.book.create({
    data: {
      ...bookData,
      genres: { connect: genres.map((id) => ({ id })) },
    },
    include: bookInclude,
  });
};

export const updateBook = async (id: number, data: Partial<CreateBookInput>) => {
  const { genres, ...rest } = data;
  try {
    return await prisma.book.update({
      where: { id },
      data: {
        ...rest,
        ...(genres !== undefined && {
          genres: { set: genres.map((gId) => ({ id: gId })) },
        }),
      },
      include: bookInclude,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return null;
    }
    throw e;
  }
};

export const deleteBook = async (id: number) => {
  try {
    await prisma.book.delete({ where: { id } });
    return true;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return null;
    }
    throw e;
  }
};
