Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
describe('Brochure Check', function () {
  it('.should() - make sure the brochure page if functioning properly', function () {
    cy.visit('https://fifa-player-match.firebaseapp.com/')
    cy.title().should('include', 'FIFA PLAYER MATCH')
    cy.get('.features-list').find ('li').should('have.length', 4);
    cy.get('input').contains('ENTER').click();
    cy.url().should('contain','/app.html?');
  });
})
describe('Skill Match Feature Check', function () {
  it('.should() - make sure the skill match feature is functioning properly', function () {
    cy.visit('/app.html?')
    cy.title().should('include', 'FIFA PLAYER MATCH')
    cy.get('.ballControl').contains('ballControl').click();
    cy.get('.skill-title').contains('BallControl')
    cy.get('.slider-container > h4').contains('FIFA AVG: 62')
    cy.get('.slider-value').contains('62')
    cy.get('.save').click();
    cy.get('.player-name').contains('D. De Girolamo')
    cy.get('.player-overall').contains('OVERALL: 60')
    cy.get('.player-position').contains('POSITION: CAM RM ST')
    cy.get('.player-club').contains('CLUB: Chesterfield')
    cy.get('.remaining-skills-list').find('li').should('have.length', 29)
    cy.get('.saved-skills-list > li').contains('ballControl: 62')
    cy.get('.match-list').find('li').should('have.length', 20)
  });
})
describe('Search Feature Check', function () {
  it('.should() - make sure the search feature is functioning properly', function () {
    cy.get('.youtube-search').click()
    cy.get('#results').find(':nth-child(1) > .video').should('have.length', 1)
    cy.get('#results').find(':nth-child(2) > .video').should('have.length', 1)
    cy.get('#results').find(':nth-child(3) > .video').should('have.length', 1)
    cy.get('#results').find(':nth-child(4) > .video').should('have.length', 1)
    cy.get('#results').find(':nth-child(5) > .video').should('have.length', 1)
    cy.get('#results').find(':nth-child(6) > .video').should('have.length', 1)
  })
})
