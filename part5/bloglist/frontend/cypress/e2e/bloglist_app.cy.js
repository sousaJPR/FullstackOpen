describe('Bloglist App', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'test',
      name: 'tester',
      password: 'test'
    }
    const user1 = {
      username: 'test1',
      name: 'tester1',
      password: 'test1'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', () => {
    it('succeds with correct credentials', () => {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-btn').click()

      cy.contains('tester logged in')
      cy.get('.success').contains('Welcome, test')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()

      cy.get('.error').contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'test', password: 'test' })
    })

    it('a blog can be created', () => {
      cy.contains('New Blog').click()
      cy.get('#title').type('New Cypress Blog')
      cy.get('#author').type('tester')
      cy.get('#url').type('random url')
      cy.get('#create-blog').click()

      cy.get('.success').contains('New Blog created!')
    })

    describe('with a blog already created', () => {
      beforeEach(() => {
        cy.contains('New Blog').click()
        cy.get('#title').type('New Cypress Blog')
        cy.get('#author').type('test')
        cy.get('#url').type('random url')
        cy.get('#create-blog').click()
        
      })

      it('user can like the blog', () => {
        cy.get('#view-btn').click()
        cy.get('#like-btn').click()
      })

      it('user can remove created blog', () => {
        cy.get('#view-btn').click()
        cy.get('#remove-btn').click()
      })

      it('login in another user and trying to delete a blog', () => {
        cy.get('#logout-btn').click()
        cy.login({ username: 'test1', password: 'test1'})
        cy.get('#view-btn')
          .click()
          .should('not.contain', 'Remove')
      })
    })

    describe('with multiple blogs created and liked', () => {
      beforeEach(() => {
        //Most likes
        cy.contains('New Blog').click()
        cy.get('#title').type('The title with the second most likes')
        cy.get('#author').type('test')
        cy.get('#url').type('random url')
        cy.get('#create-blog').click()
        
        //Second with most likes
        cy.contains('New Blog').click()
        cy.get('#title').type('The title with the most likes')
        cy.get('#author').type('test')
        cy.get('#url').type('random url')
        cy.get('#create-blog').click()

        cy.contains('New Blog').click()
        cy.get('#title').type('The title with the 3rd most likes')
        cy.get('#author').type('test')
        cy.get('#url').type('random url')
        cy.get('#create-blog').click()

        cy.get('.blog-container')
          .eq(1)
          .find('#view-btn').click()
          .wait(2000)
          .get('#like-btn').click()
          .wait(2000)
          .get('#like-btn').click()
        
        cy.get('.blog-container')
          .eq(0)
          .find('#view-btn').click()
          .wait(2000)
          .get('#like-btn').click()
      })

      it('check if blogs are sorted by the number of likes', () => {
        cy.get('.blog-container')
          .eq(0)
          .should('contain', "The title with the most likes")
        cy.get('.blog-container')
          .eq(1)
          .should('contain', "The title with the second most likes")
        })
     
    })
  })

})