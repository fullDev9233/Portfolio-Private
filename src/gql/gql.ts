/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
  '\n  query NonBankableAssets($portfolioId: String!) {\n    illiquidAssetPortfolioPositions(portfolioId: $portfolioId) {\n      id\n      currency\n      instrumentTypeName\n      marketValue\n      timeWeightedReturn\n      illiquidAsset {\n        id\n        name\n      }\n    }\n  }\n':
    types.NonBankableAssetsDocument,
  '\n  query IlliquidAsset($illiquidAssetId: String!) {\n    illiquidAsset(illiquidAssetId: $illiquidAssetId) {\n      name\n      currency\n      instrumentType\n      lastValuation {\n        valuationDate\n        valuation\n      }\n      image\n    }\n  }\n':
    types.IlliquidAssetDocument,
  '\n  mutation CreateIlliquidAssetValuation(\n    $illiquidAssetId: String!\n    $data: ValuationInputType!\n  ) {\n    createIlliquidAssetValuation(illiquidAssetId: $illiquidAssetId, data: $data) {\n      id\n    }\n  }\n':
    types.CreateIlliquidAssetValuationDocument,
};

export function graphql(
  source: '\n  query NonBankableAssets($portfolioId: String!) {\n    illiquidAssetPortfolioPositions(portfolioId: $portfolioId) {\n      id\n      currency\n      instrumentTypeName\n      marketValue\n      timeWeightedReturn\n      illiquidAsset {\n        id\n        name\n      }\n    }\n  }\n',
): typeof documents['\n  query NonBankableAssets($portfolioId: String!) {\n    illiquidAssetPortfolioPositions(portfolioId: $portfolioId) {\n      id\n      currency\n      instrumentTypeName\n      marketValue\n      timeWeightedReturn\n      illiquidAsset {\n        id\n        name\n      }\n    }\n  }\n'];
export function graphql(
  source: '\n  query IlliquidAsset($illiquidAssetId: String!) {\n    illiquidAsset(illiquidAssetId: $illiquidAssetId) {\n      name\n      currency\n      instrumentType\n      lastValuation {\n        valuationDate\n        valuation\n      }\n      image\n    }\n  }\n',
): typeof documents['\n  query IlliquidAsset($illiquidAssetId: String!) {\n    illiquidAsset(illiquidAssetId: $illiquidAssetId) {\n      name\n      currency\n      instrumentType\n      lastValuation {\n        valuationDate\n        valuation\n      }\n      image\n    }\n  }\n'];
export function graphql(
  source: '\n  mutation CreateIlliquidAssetValuation(\n    $illiquidAssetId: String!\n    $data: ValuationInputType!\n  ) {\n    createIlliquidAssetValuation(illiquidAssetId: $illiquidAssetId, data: $data) {\n      id\n    }\n  }\n',
): typeof documents['\n  mutation CreateIlliquidAssetValuation(\n    $illiquidAssetId: String!\n    $data: ValuationInputType!\n  ) {\n    createIlliquidAssetValuation(illiquidAssetId: $illiquidAssetId, data: $data) {\n      id\n    }\n  }\n'];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
