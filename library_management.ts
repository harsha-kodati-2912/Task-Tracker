class Book {
  readonly id;
  readonly title;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

class User {
  readonly id;
  readonly name;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Library {
  private books = new Map<number, Book>();
  private users = new Map<number, User>();
  private issuedBooks = new Map<number, Set<number>>();

  addBook(book: Book) {
    this.books.set(book.id, book);
  }

  removeBook(bookId: number) {
    if (this.isBookIssued(bookId)) {
      throw new Error("Book is currently issued and cannot be removed");
    }
    this.books.delete(bookId);
  }

  addUser(user: User) {
    this.users.set(user.id, user);
    this.issuedBooks.set(user.id, new Set());
  }

  issueBook(bookId: number, userId: number) {
    if (!this.books.has(bookId)) {
      throw new Error("Book does not exist");
    }

    if (!this.users.has(userId)) {
      throw new Error("User does not exist");
    }

    if (this.isBookIssued(bookId)) {
      throw new Error("Book is already issued");
    }

    this.issuedBooks.get(userId)?.add(bookId);
  }

  returnBook(bookId: number, userId: number) {
    const userBooks = this.issuedBooks.get(userId);

    if (!userBooks || !userBooks.has(bookId)) {
      throw new Error("Book was not issued to this user");
    }

    userBooks.delete(bookId);
  }

  listIssuedBooks(userId: number) {
    const userBooks = this.issuedBooks.get(userId);

    if (!userBooks || userBooks.size === 0) {
      console.log("No books issued");
      return;
    }

    for (const bookId of userBooks) {
      const book = this.books.get(bookId);
      console.log(book?.title);
    }
  }

  private isBookIssued(bookId: number) {
    for (const books of this.issuedBooks.values()) {
      if (books.has(bookId)) {
        return true;
      }
    }
    return false;
  }
}
const library = new Library();

library.addBook(new Book(1, "November 9"));
library.addBook(new Book(2, "It ends with us"));

library.addUser(new User(101, "Harsha"));

library.issueBook(1, 101);
library.listIssuedBooks(101);

library.returnBook(1, 101);
library.listIssuedBooks(101);