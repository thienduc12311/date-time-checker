describe("User Interface: ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("have FPT logo in left corner", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get(".logo-container > img").should("have.class", "logo");
  });
  it("have heading", () => {
    cy.get(".app-container > .heading").should(
      "have.text",
      "Date time checker"
    );
  });
  it("have an input field for Day", () => {
    cy.get(".app-container input:first").should("have.id", "day");
  });
  it("have an input field for Month", () => {
    cy.get(".app-container input:eq(1)").should("have.id", "month");
  });
  it("have an input field for Year", () => {
    cy.get(".app-container input:eq(2)").should("have.id", "year");
  });
  it("have Clear button", () => {
    cy.get(".app-container button:eq(0)").should("have.text", "Clear");
  });
  it("have Check button", () => {
    cy.get(".app-container button:eq(1)").should("have.text", "Check");
  });
});

describe("Clear function: ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should clear all input field", () => {
    cy.get(".app-container input:eq(0)").type("300000");
    cy.get(".app-container input:eq(1)").type("2232323");
    cy.get(".app-container input:eq(2)").type("2001");
    cy.wait(500);
    cy.get(".app-container button:eq(0)").click();
    cy.get(".app-container input:eq(0)").should("have.value", "");
    cy.get(".app-container input:eq(1)").should("have.value", "");
    cy.get(".app-container input:eq(2)").should("have.value", "");
    cy.wait(500);
  });
});

describe("Check function: ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should show error when the input field is empty", () => {
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".error-message:eq(0)").should("have.text", "Day is required");
    cy.get(".error-message:eq(1)").should("have.text", "Month is required");
    cy.get(".error-message:eq(2)").should("have.text", "Year is required");
  });
  it("should show error when the input field is not a positive number", () => {
    cy.get(".app-container input:eq(0)").type("abc");
    cy.get(".app-container input:eq(1)").type("xyz");
    cy.get(".app-container input:eq(2)").type("avb");
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".error-message:eq(0)").should(
      "have.text",
      "Please input valid number"
    );
    cy.get(".error-message:eq(1)").should(
      "have.text",
      "Please input valid number"
    );
    cy.get(".error-message:eq(2)").should(
      "have.text",
      "Please input valid number"
    );
  });
  it("should show dialog: Input data for Day is out of range", () => {
    cy.get(".app-container input:eq(0)").type("300");
    cy.get(".app-container input:eq(1)").type("12");
    cy.get(".app-container input:eq(2)").type("2001");
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".modal .content").should(
      "have.text",
      "Input data for Day is out of range!"
    );
    cy.wait(500);
  });
  it("should show dialog: Input data for Day is out of range", () => {
    cy.get(".app-container input:eq(0)").type("30");
    cy.get(".app-container input:eq(1)").type("13");
    cy.get(".app-container input:eq(2)").type("2001");
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".modal .content").should(
      "have.text",
      "Input data for Month is out of range"
    );
  });
  it("should show dialog: 20/2/2020 is a valid date", () => {
    cy.get(".app-container input:eq(0)").type("20");
    cy.get(".app-container input:eq(1)").type("2");
    cy.get(".app-container input:eq(2)").type("2020");
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".modal .content").should("have.text", "20/2/2020 is a valid date!");
  });
  it("should show dialog: 29/2/2020 is a valid date", () => {
    cy.get(".app-container input:eq(0)").type("29");
    cy.get(".app-container input:eq(1)").type("2");
    cy.get(".app-container input:eq(2)").type("2020");
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".modal .content").should("have.text", "29/2/2020 is a valid date!");
  });
  it("should show dialog: 29/2/2021 is NOT a valid date", () => {
    cy.get(".app-container input:eq(0)").type("29");
    cy.get(".app-container input:eq(1)").type("2");
    cy.get(".app-container input:eq(2)").type("2021");
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".modal .content").should(
      "have.text",
      "29/2/2021 is NOT a valid date!"
    );
  });
  it("should show dialog: 31/12/2021 is a valid date", () => {
    cy.get(".app-container input:eq(0)").type("31");
    cy.get(".app-container input:eq(1)").type("12");
    cy.get(".app-container input:eq(2)").type("2021");
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".modal .content").should(
      "have.text",
      "31/12/2021 is a valid date!"
    );
  });
  it("should show dialog: 31/11/2021 is NOT a valid date", () => {
    cy.get(".app-container input:eq(0)").type("31");
    cy.get(".app-container input:eq(1)").type("11");
    cy.get(".app-container input:eq(2)").type("2021");
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".modal .content").should(
      "have.text",
      "31/11/2021 is NOT a valid date!"
    );
  });
  it("should show dialog: 30/11/2021 is a valid date", () => {
    cy.get(".app-container input:eq(0)").type("30");
    cy.get(".app-container input:eq(1)").type("11");
    cy.get(".app-container input:eq(2)").type("2021");
    cy.get(".app-container button:eq(1)").click();
    cy.wait(500);
    cy.get(".modal .content").should(
      "have.text",
      "30/11/2021 is a valid date!"
    );
  });
});
