const bookFirst = {
  title: "Бойцовский клуб",
  description: "Роман",
  author: "Чак Паланик",
};

const bookSecond = {
  title: "Его Превосходительство Эжен Ругон",
  description: "Роман",
  author: "Эмиль Золя",
};

const bookThird = {
  title: "Маленький принц",
  description: "Аллегорическая повесть-сказка",
  author: "Антуан де Сент-Экзюпери",
};

describe("favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("bropet@mail.ru", "123");
  });

  it("Should add new book", () => {
    cy.addNewBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addBookToFavorite(bookSecond);
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title).should("be.visible")
    .within(() =>
      cy.get(".card-footer > .btn").click()
    );
    cy.contains(bookSecond.title).should("not.exist");
  });

  it("Should add book to favorite", () => {
    cy.addNewBook(bookThird);
    cy.contains(bookThird.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookThird.title).should("be.visible");
  });
});
