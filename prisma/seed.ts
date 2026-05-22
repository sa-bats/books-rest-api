import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env["DATABASE_URL"] }),
});

async function main() {
  await prisma.author.createMany({
    data: [
      { firstName: "Fyodor", lastName: "Dostoevsky", birthYear: 1821, nationality: "Russian", biography: "Fyodor Dostoevsky was a Russian novelist whose major works explored psychology, morality, freedom, and faith." },
      { firstName: "Leo", lastName: "Tolstoy", birthYear: 1828, nationality: "Russian", biography: "Leo Tolstoy was a Russian writer and one of the most influential novelists in world literature, best known for epic realist fiction." },
      { firstName: "Ivan", lastName: "Turgenev", birthYear: 1818, nationality: "Russian", biography: "Ivan Turgenev was a Russian novelist, poet, and playwright known for elegant prose and social realism." },
      { firstName: "Nikolai", lastName: "Gogol", birthYear: 1809, nationality: "Russian", biography: "Nikolai Gogol was a Russian writer of Ukrainian origin whose satire and grotesque style deeply influenced Russian literature." },
      { firstName: "Anton", lastName: "Chekhov", birthYear: 1860, nationality: "Russian", biography: "Anton Chekhov was a Russian playwright and short-story writer, widely regarded as a master of the modern short story." },
      { firstName: "Alexander", lastName: "Pushkin", birthYear: 1799, nationality: "Russian", biography: "Alexander Pushkin was a Russian writer and poet, often regarded as the founder of modern Russian literature." },
    ],
  });

  await prisma.publisher.createMany({
    data: [
      { name: "Penguin Books", country: "United Kingdom", foundedYear: 1935, website: "https://www.penguin.co.uk" },
      { name: "Wordsworth Editions", country: "United Kingdom", foundedYear: 1987, website: "https://wordsworth-editions.com" },
      { name: "Oxford University Press", country: "United Kingdom", foundedYear: 1478, website: "https://global.oup.com" },
    ],
  });

  await prisma.genre.createMany({
    data: [
      { name: "Classic Literature" },
      { name: "Psychological Fiction" },
      { name: "Historical Fiction" },
      { name: "Philosophical Fiction" },
      { name: "Satire" },
      { name: "Romance" },
      { name: "Short Stories" },
      { name: "Poetry" },
    ],
  });

  const booksData = [
    { title: "Crime and Punishment", isbn: "9780140449136", publishedYear: 1866, pageCount: 720, language: "English", description: "A poor former student in Saint Petersburg commits a murder and faces the moral and psychological consequences.", authorId: 1, publisherId: 1, genres: [1, 2, 4] },
    { title: "The Brothers Karamazov", isbn: "9780099922803", publishedYear: 1880, pageCount: 816, language: "English", description: "A philosophical family drama centered on parricide, faith, doubt, and moral responsibility.", authorId: 1, publisherId: 1, genres: [1, 2, 4] },
    { title: "The Idiot", isbn: "9781853261756", publishedYear: 1869, pageCount: 592, language: "English", description: "Prince Myshkin returns to Russia and becomes entangled in a society shaped by vanity, passion, and corruption.", authorId: 1, publisherId: 2, genres: [1, 2, 4] },
    { title: "Notes from Underground", isbn: "9780099140115", publishedYear: 1864, pageCount: 176, language: "English", description: "A deeply introspective novella narrated by a bitter former civil servant reflecting on free will and alienation.", authorId: 1, publisherId: 1, genres: [1, 2, 4] },
    { title: "Demons", isbn: "9780141441412", publishedYear: 1872, pageCount: 880, language: "English", description: "A political and philosophical novel about radicalism, violence, and social collapse in provincial Russia.", authorId: 1, publisherId: 1, genres: [1, 2, 4] },
    { title: "Anna Karenina", isbn: "9780141199610", publishedYear: 1878, pageCount: 864, language: "English", description: "A tragic love story set against Russian high society, contrasted with a parallel search for meaning and family life.", authorId: 2, publisherId: 1, genres: [1, 3, 6] },
    { title: "War and Peace", isbn: "9780241265543", publishedYear: 1869, pageCount: 1440, language: "English", description: "An epic novel intertwining aristocratic family lives with the Napoleonic wars in Russia.", authorId: 2, publisherId: 1, genres: [1, 3] },
    { title: "Resurrection", isbn: "9781840227284", publishedYear: 1899, pageCount: 496, language: "English", description: "A nobleman seeks moral redemption after encountering a woman he once wronged during a criminal trial.", authorId: 2, publisherId: 2, genres: [1, 4] },
    { title: "Fathers and Sons", isbn: "9781853262869", publishedYear: 1862, pageCount: 240, language: "English", description: "A novel about generational conflict, nihilism, and social change in nineteenth-century Russia.", authorId: 3, publisherId: 2, genres: [1, 4] },
    { title: "Dead Souls", isbn: "9781840226379", publishedYear: 1842, pageCount: 496, language: "English", description: "A satirical picaresque about a schemer buying titles to deceased serfs in imperial Russia.", authorId: 4, publisherId: 2, genres: [1, 5] },
    { title: "The Cherry Orchard", isbn: "9780140447248", publishedYear: 1904, pageCount: 128, language: "English", description: "A tragicomedy about an aristocratic Russian family who lose their estate, including a beloved cherry orchard.", authorId: 5, publisherId: 1, genres: [1, 7] },
    { title: "Eugene Onegin", isbn: "9780199538645", publishedYear: 1833, pageCount: 288, language: "English", description: "Pushkin's novel in verse follows love, regret, and social life in early nineteenth-century Russia.", authorId: 6, publisherId: 3, genres: [1, 6, 8] },
  ];

  for (const { genres, ...book } of booksData) {
    await prisma.book.create({
      data: {
        ...book,
        genres: { connect: genres.map((id) => ({ id })) },
      },
    });
  }

  await prisma.review.createMany({
    data: [
      { bookId: 1, userName: "Alice", rating: 5, comment: "An absolute masterpiece! Dostoevsky's exploration of the human psyche is unparalleled." },
      { bookId: 2, userName: "Bob", rating: 4, comment: "Tolstoy's epic storytelling and deep character development make this a must-read." },
      { bookId: 3, userName: "Charlie", rating: 4, comment: "Turgenev's elegant prose and social commentary are truly captivating." },
      { bookId: 4, userName: "Diana", rating: 5, comment: "Gogol's satire is brilliant and his characters are unforgettable." },
      { bookId: 5, userName: "Eve", rating: 5, comment: "Chekhov's mastery of the short story is evident in every page." },
      { bookId: 1, userName: "Frank", rating: 4, comment: "Dostoevsky's psychological depth is incredible." },
      { bookId: 1, userName: "Grace", rating: 5, comment: "A profound read that stays with you." },
      { bookId: 1, userName: "Henry", rating: 3, comment: "Heavy and philosophical, not for everyone." },
      { bookId: 2, userName: "Ivy", rating: 5, comment: "Tolstoy's exploration of faith and morality is timeless." },
      { bookId: 2, userName: "Jack", rating: 4, comment: "Epic in scope, with unforgettable characters." },
      { bookId: 2, userName: "Kate", rating: 4, comment: "A deep dive into human nature and ethics." },
      { bookId: 3, userName: "Liam", rating: 5, comment: "Prince Myshkin's innocence is beautifully portrayed." },
      { bookId: 3, userName: "Mia", rating: 4, comment: "Dostoevsky's social critique is sharp and relevant." },
      { bookId: 3, userName: "Noah", rating: 3, comment: "Intriguing but a bit slow-paced." },
      { bookId: 4, userName: "Olivia", rating: 5, comment: "A brilliant introspection on free will." },
      { bookId: 4, userName: "Peter", rating: 4, comment: "Short but powerful novella." },
      { bookId: 4, userName: "Quinn", rating: 4, comment: "Dostoevsky's underground man is unforgettable." },
      { bookId: 5, userName: "Ryan", rating: 5, comment: "A chilling look at radicalism and society." },
      { bookId: 5, userName: "Sophia", rating: 4, comment: "Complex and thought-provoking." },
      { bookId: 5, userName: "Tyler", rating: 3, comment: "Dense and requires patience." },
      { bookId: 6, userName: "Uma", rating: 5, comment: "Tolstoy's Anna is a tragic heroine." },
      { bookId: 6, userName: "Victor", rating: 4, comment: "Love, society, and morality intertwined." },
      { bookId: 6, userName: "Wendy", rating: 5, comment: "A masterpiece of Russian literature." },
      { bookId: 7, userName: "Xander", rating: 5, comment: "Epic scope covering war and peace." },
      { bookId: 7, userName: "Yara", rating: 4, comment: "Tolstoy's philosophy shines through." },
      { bookId: 7, userName: "Zane", rating: 4, comment: "Long but rewarding read." },
      { bookId: 8, userName: "Alice2", rating: 5, comment: "Tolstoy's redemption story is moving." },
      { bookId: 8, userName: "Bob2", rating: 4, comment: "Themes of justice and morality." },
      { bookId: 8, userName: "Charlie2", rating: 4, comment: "A compelling tale of change." },
      { bookId: 9, userName: "Diana2", rating: 5, comment: "Turgenev's generational conflict is spot on." },
      { bookId: 9, userName: "Eve2", rating: 4, comment: "Nihilism and youth explored deeply." },
      { bookId: 9, userName: "Frank2", rating: 3, comment: "Interesting but dated themes." },
      { bookId: 10, userName: "Grace2", rating: 5, comment: "Gogol's satire is hilarious and sharp." },
      { bookId: 10, userName: "Henry2", rating: 4, comment: "A critique of Russian society." },
      { bookId: 10, userName: "Ivy2", rating: 4, comment: "Unforgettable characters and plot." },
      { bookId: 11, userName: "Jack2", rating: 5, comment: "Pushkin's verse is poetic and engaging." },
      { bookId: 11, userName: "Kate2", rating: 4, comment: "A classic tale of love and society." },
      { bookId: 11, userName: "Liam2", rating: 5, comment: "Elegant and timeless literature." },
    ],
  });

  console.log("Seed completed: 6 authors, 3 publishers, 8 genres, 12 books, 38 reviews");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
