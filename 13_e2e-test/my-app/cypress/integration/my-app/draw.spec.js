describe('my-app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.waitForReact();
  });

  it('click the first square', () => {
    cy.react('Square').eq(0).click().should('contain', 'X');
    cy.get('[data-test=status]').should('contain', '次のプレイヤー: O');
    cy.get('[data-test=history] > li')
      .eq(1)
      .should('contain', 'Go to move #1 (0, 0)');
  });

  it('X wins', () => {
    [...Array(7).keys()].forEach((n) => {
      cy.react('Square').eq(n).click();
    });
    cy.get('[data-test=status]').should('contain', 'Winner: X');
  });

  it('draw', () => {
    [0, 1, 2, 3, 5, 4, 6, 8, 7].forEach((n) => {
      cy.react('Square').eq(n).click();
    });
    cy.get('[data-test=status]').should('contain', 'Draw!');
  });
});
