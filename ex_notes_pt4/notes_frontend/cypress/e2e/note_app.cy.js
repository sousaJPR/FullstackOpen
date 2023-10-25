describe('Note app', () => {

  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Root',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login fails with wrong password', () => {
    cy.contains('Login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('fail')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'Welcome Root')
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
      cy.login({ username: 'root', password: 'root' })
    })

    it('a new note can be created', () => {
      cy.contains('New Note').click()
      cy.get('#new-note').type('a note created with cypress')
      cy.contains('Save').click()
      cy.contains('a note created with cypress')
    })

    describe('and several notes exist', () => {
      beforeEach(() => {
        cy.createNote({ content: 'first note', important: true })
        cy.createNote({ content: 'second note', important: true })
        cy.createNote({ content: 'third note', important: true })
      })

      it('one of those can be made not important', () => {
        cy.contains('first note')
          .parent()
          .find('button')
          .as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make important')

      })
    })
  })
})