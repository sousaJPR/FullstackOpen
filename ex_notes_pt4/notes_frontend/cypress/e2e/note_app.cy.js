describe('Note app', () => {

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Root',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it.only('login fails with wrong password', () => {
    cy.contains('Login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('fail')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'Welcome Root')
  })
  it('front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened and user can login', () => {
    cy.contains('Login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('root')
    cy.get('#login-button').click()

    cy.contains('Welcome Root')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.contains('Login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
    })

    it('a new note can be created', () => {
      cy.contains('New Note').click()
      cy.get('#new-note').type('a note created with cypress')
      cy.contains('Save').click()
      cy.contains('a note created with cypress')
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.contains('New Note').click()
        cy.get('#new-note').type('another note cypress')
        cy.contains('Save').click()
      })

      it('it can be made not important', () => {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()

        cy.contains('another note cypress')
          .contains('make important')
      })
    })
  })
})