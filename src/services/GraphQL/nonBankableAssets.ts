import { graphql } from '../../gql/gql';

export const NON_BANKABLE_ASSETS_QUERY = graphql(`
  query NonBankableAssets($portfolioId: String!) {
    illiquidAssetPortfolioPositions(portfolioId: $portfolioId) {
      id
      currency
      instrumentTypeName
      marketValue
      timeWeightedReturn
      illiquidAsset {
        id
        name
      }
    }
  }
`);

export const ILLIQUID_ASSET_QUERY = graphql(`
  query IlliquidAsset($illiquidAssetId: String!) {
    illiquidAsset(illiquidAssetId: $illiquidAssetId) {
      name
      currency
      instrumentType
      lastValuation {
        valuationDate
        valuation
      }
      image
    }
  }
`);

export const CREATE_ILLIQUID_ASSET_VALUATION_MUTATION = graphql(`
  mutation CreateIlliquidAssetValuation(
    $illiquidAssetId: String!
    $data: ValuationInputType!
  ) {
    createIlliquidAssetValuation(illiquidAssetId: $illiquidAssetId, data: $data) {
      id
    }
  }
`);
