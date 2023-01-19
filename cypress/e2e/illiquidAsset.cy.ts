import { format } from 'date-fns';

import { client } from '../../src/apolloClient';
import { NON_BANKABLE_ASSETS_QUERY,
  ILLIQUID_ASSET_QUERY,
  CREATE_ILLIQUID_ASSET_VALUATION_MUTATION
} from '../../src/services/GraphQL/nonBankableAssets';

describe('Illiquid Asset', () => {
  beforeEach(() => {
    cy.visit('/login');

    const username = '';
    const password = '';

    cy.login(username, password)
      .its('status')
      .should('eq', 200);
  });

  describe('Should navigate to the illiquid-assets page', () => {
    beforeEach(() => {
      cy.get('a')
        .should('have.length', 4)
        .eq(3)
        .click();
      cy.url().should('include', '/illiquid-assets');

      const options = {
        method: 'GET',
        url: `${Cypress.env('backendUrl')}/portfolios`,
      };

      cy.request(options)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.a('array');
        })
          .then(() => {
            cy.get('#auto-complete')
            .should('exist')
            .click()
            .get('ul li')
            .should('have.length.gte', 0)
            .eq(0)
            .click();

            cy.wrap(
              client.query({
                query: NON_BANKABLE_ASSETS_QUERY,
                variables: { portfolioId: '4 17 303' },
                fetchPolicy: 'no-cache',
              }),
            )
              .its('data.illiquidAssetPortfolioPositions')
              .should('be.an', 'array')
              .get('.illiquid-asset-table')
              .should('exist')
              .wait(2000);
          })
    });

    it('Should navigate to the illiquid-asset tab and go through the steps of the wizard to create a new asset', () => {
      const assetName = 'hello world';
      const floorSpace = 123;
      const purchaseValue = 234;
      const currentValue = 345;
      const purchaseDate = format(new Date(), 'MM/dd/yyyy');
      const valuationDate = format(new Date(), 'MM/dd/yyyy');

      cy.get('.non-bankable-asset-btn')
        .click();

      cy.get('.form-title')
        .should('contain', 'Add a new');

      cy.get('.asset-type-btn').should('have.length', 4).eq(0).click();

      cy.get('.add-asset-details').should('exist').click();

      cy.get('#assetName').type(assetName).should('have.value', assetName);
      cy.get('.MuiAutocomplete-root')
        .click()
        .get('li')
        .should('have.length.gte', 0)
        .eq(0)
        .click();
      cy.get('#floorSpace').type(floorSpace.toString()).should('have.value', floorSpace);
      cy.get('#purchaseValue')
        .type(purchaseValue.toString())
        .should('have.value', purchaseValue);
      cy.get('#currentValue').type(currentValue.toString()).should('have.value', currentValue);
      cy.get('#purchaseDate').type(purchaseDate).should('have.value', purchaseDate);
      cy.get('#valuationDate').type(valuationDate).should('have.value', valuationDate);

      cy.get('.next-btn').click().get('.assetName-review').should('contain', assetName);
      cy.get('.submit-btn-review').click().get('.status-title').should('contain', 'Success');
    });

    it('Should go to the illiquid-asset tab by clicking the discard button on the wizard section', () => {
      cy.get('.non-bankable-asset-btn')
        .click();
        
      cy.get('.discard-btn')
        .should('exist')
        .click();

      cy.get('.non-bankable-asset-btn')
        .should('exist');
    });

    it('Should open the drawer by clicking the context menu and the drawer should properly work.', () => {
      const idContextMenu = Math.floor(Math.random() * 2);
      const className = idContextMenu === 0 ? '.asset-instrument-type' : '.last-value';
      const illiquidAssetId = 'qSNkBEoMqfdPpIH9LUPoO';

      cy.get('.MuiDataGrid-row')
        .eq(2)
        .rightclick()
        .get('li')
        .should('have.length', 2)
        .eq(idContextMenu)
        .click()
        .get(className)
        .should('exist');

      if (idContextMenu === 1) {
        cy.wrap(
          client.query({
            query: ILLIQUID_ASSET_QUERY,
            variables: { illiquidAssetId },
            fetchPolicy: 'no-cache',
          })
        )
          .its('data.illiquidAsset')
          .as('illiquidAsset')
          .should('exist');

        cy.get('@illiquidAsset')
          .then((illiquidAsset: any) => {
            const currency = illiquidAsset.currency;
            const mm = Math.floor(Math.random() * 11);
            const dd = Math.floor(Math.random() * 29);
            const yy = Math.floor(
              Math.random() * (2022 - 1910 + 1) + 1910
            );
            const valuationDate = format(new Date(`${mm}/${dd}/${yy}`), 'MM/dd/yyyy');
            console.log(valuationDate)
            const valuation = Math.floor(
              Math.random() * (10000 - 1 + 1) + 1
            );

            cy.get('#drawer-valuation-date')
              .clear()
              .type(`${valuationDate}`)
              .should('have.value', valuationDate);

            cy.get('#drawer-valuation')
              .type(`${valuation}`)
              .should('have.value', valuation);

            cy.get('.add-valuation-btn')
              .click();
          });
      }
    });
  });
});
