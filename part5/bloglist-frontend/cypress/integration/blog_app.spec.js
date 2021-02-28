describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      username : 'xela123',
      name : 'xella',
      password : 'atuka'
    }
    cy.request('POST','http://localhost:3001/api/users',newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('html').should('contain','Login into account')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'xela123', password: 'atuka' })
      cy.get('html').should('contain','logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('xela123')
      cy.get('#password').type('wrong123')
      cy.get('#login-button').click()
      cy.get('.error').should('contain','invalid username or password')
    })
  })
  describe('when logged in' , function(){
    beforeEach(function (){
      cy.login({username : 'xela123',password : 'atuka'})
      cy.visit('http://localhost:3000')
    })
    it('a blog can be created', function (){
      cy.createBlog({title : 'racxa', author : 'vincxa',url : 'pornhub.com',likes : 0})
      cy.get('html').should('contain','| Title : racxa | Author : vincxa |')
    })
    it('click add button', function(){
      cy.createBlog({title : 'racxa', author : 'vincxa',url : 'pornhub.com',likes : 0})
      cy.contains('| Title : racxa | Author : vincxa |').contains('view').click()
      cy.contains('likes 0').contains('add').click()
      cy.contains('likes 1')
    })
    it('user can delete added blog', function(){
      cy.createBlog({title : 'racxa', author : 'vincxa',url : 'pornhub.com'})
      cy.contains('| Title : racxa | Author : vincxa |').contains('view').click()
      cy.contains('delete').click()
      cy.get('html').should('not.contain','| Title : racxa | Author : vincxa |')
    })
    it('make sure its sorted according likes' , function(){
      cy.createBlog({title : 'racxa0', author : 'vincxa0',url : 'pornhub.com',likes : 4})
      cy.createBlog({title : 'racxa1', author : 'vincxa1',url : 'pornhub.com',likes : 9})
      cy.createBlog({title : 'racxa2', author : 'vincxa2',url : 'pornhub.com',likes : 12})
      cy.get('.likes-count').then( (buttons) => {
         cy.wrap(buttons[0].textContent).should('equal','likes 12 add')
      })
    })
  })
})