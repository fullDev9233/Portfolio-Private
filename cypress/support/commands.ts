Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name="username"]')
    .type(username)
    .should('have.value', username)
    .get('input[name="password"]')
    .type(password)
    .should('have.value', password)
    .get('button')
    .click();

  cy.request({
      method:'POST', 
      url: `${Cypress.env('backendUrl')}/users/login`,
      body: {
        username,
        password,
      }
    })
    .as('loginResponse')
    .then((response) => {
      Cypress.env('token', response.body.token);
      return response;
    })
});

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
  const optionsObject = options[0];
  const token = Cypress.env('token');

  if (!!token && optionsObject === Object(optionsObject)) {
    optionsObject.headers = {
      authorization: 'Bearer ' + token,
      ...optionsObject.headers,
    };

    return originalFn(optionsObject);
  }

  return originalFn(...options);
});

Cypress.Commands.add('visitPortfolioAnalysis', (tableName: string) => {
  const options = {
    method: 'GET',
    url: `${Cypress.env('backendUrl')}/portfolios`,
  };

  cy.request(options)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('array');

      const id = response.body[1].id;
      return id;
    })
      .then((id) => {
        const idContextMenu = Math.floor(Math.random() * 2);
        const tabName = idContextMenu === 0 ? 'Positions' : 'Transaction';
        const uri = idContextMenu === 0 ? 'portfolios/table' : 'transactions';

        cy.get(tableName)
          .find('.MuiDataGrid-row')
          .should('exist')
          .eq(1)
          .rightclick()
          .get('ul li')
          .should('have.length', 2)
          .eq(idContextMenu)
          .click();

        cy.url().should('include', '/analysis');

        const options = {
          method: 'GET',
          url: `${Cypress.env('backendUrl')}/${uri}/${id}`,
        };

        cy.request(options)
          .then((response) => {
            expect(response.status).to.eq(200);

            cy.get('.MuiButtonBase-root').should('contain', tabName);
          });
      });
});

Cypress.Commands.add('getPortfolios', () => {
  const options = {
    method: 'GET',
    url: `${Cypress.env('backendUrl')}/portfolios`,
  };

  cy.request(options)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('array');

      const id = response.body[1].id;
      Cypress.env('portfolioId', id);
      return id;
    })
});


