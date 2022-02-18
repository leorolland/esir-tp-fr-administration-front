describe('Test Home Page', () => {
  it('Visits the project page and verify nav contents', () => {
    cy.visit('/')
    cy.contains('Description du projet')
    cy.contains('Accueil')
    cy.contains('Utilisateur')
    cy.contains('Accueil')
    cy.get('.account').should('not.exist');
  })
})

describe('Test Navigation when logged out', () => {
  it('Click on all links in the navbar', () => {
    cy.contains('Utilisateurs').click()
    cy.url().should('include', '/login')
    cy.contains('Associations').click()
    cy.url().should('include', '/login')
    cy.contains('Accueil').click()
    cy.url().should('include', '/home')
    cy.contains('Se connecter').click()
    cy.url().should('include', '/login')
  })
})

describe('Test Log in', () => {
  it('Test the form and then log in', () => {
    cy.contains('Se connecter').click()
    cy.get('#username')
      .type('1')
      .should('have.value', '1')
    cy.get('#password')
      .type('password')
      .should('have.value', 'password')
    cy.contains('Login').click()
    cy.url().should('include', '/users')
  })
})

describe('Test Log out', () => {
  it('Log out', () => {
    cy.contains('Se déconnecter').click()
    cy.url().should('include', '/home')
  })
})

describe('Test Navigation when logged in', () => {
  it('Visits all links from nav bar', () => {
    cy.contains('Se connecter').click()
    cy.get('#username')
      .type('1')
    cy.get('#password')
      .type('password')
    cy.contains('Login').click()
    cy.contains('Utilisateurs').click()
    cy.url().should('include', '/users')
    cy.contains('Associations').click()
    cy.url().should('include', '/associations')
    cy.contains('Accueil').click()
    cy.url().should('include', '/home')
    cy.contains('Mon compte').click()
    cy.url().should('include', '/profile')
  })
})

