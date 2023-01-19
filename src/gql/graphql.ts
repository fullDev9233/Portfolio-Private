/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** View layout custom scalar */
  ViewLayout: any;
};

export type CreateViewInput = {
  layout?: InputMaybe<Scalars['ViewLayout']>;
  name: Scalars['String'];
  tableScope: Scalars['String'];
};

export enum HoldingDisplayTypes {
  InsuranceSum = 'INSURANCE_SUM',
  InvestmentRate = 'INVESTMENT_RATE',
  Nominal = 'NOMINAL',
  Without = 'WITHOUT',
}

export type IlliquidAsset = {
  __typename?: 'IlliquidAsset';
  currency: Scalars['String'];
  holdingDisplayType: HoldingDisplayTypes;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  instrumentType: IlliquidAssetType;
  lastValuation?: Maybe<IlliquidAssetValuation>;
  name: Scalars['String'];
  valuationMethod: ValuationMethods;
  valuations?: Maybe<Array<Maybe<IlliquidAssetValuation>>>;
};

export type IlliquidAssetPosition = {
  __typename?: 'IlliquidAssetPosition';
  currency: Scalars['String'];
  id: Scalars['ID'];
  illiquidAsset: IlliquidAsset;
  illiquidAssetId: Scalars['ID'];
  instrumentType?: Maybe<IlliquidAssetType>;
  instrumentTypeName?: Maybe<Scalars['String']>;
  marketValue: Scalars['Float'];
  name: Scalars['String'];
  timeWeightedReturn: Scalars['Float'];
};

export enum IlliquidAssetType {
  Collection = 'Collection',
  Insurance = 'Insurance',
  Investment = 'Investment',
  RealEstate = 'RealEstate',
}

export type IlliquidAssetValuation = {
  __typename?: 'IlliquidAssetValuation';
  currency: Scalars['String'];
  id: Scalars['ID'];
  illiquidAssetId: Scalars['String'];
  valuation: Scalars['Float'];
  valuationDate: Scalars['String'];
  valuationMethod: ValuationMethods;
};

export type Mutation = {
  __typename?: 'Mutation';
  createIlliquidAssetValuation?: Maybe<IlliquidAssetValuation>;
  createView?: Maybe<View>;
  deleteView?: Maybe<Scalars['ID']>;
  login?: Maybe<UserData>;
  updatePreferences?: Maybe<User>;
  updateView?: Maybe<View>;
};

export type MutationCreateIlliquidAssetValuationArgs = {
  data: ValuationInputType;
  illiquidAssetId: Scalars['String'];
};

export type MutationCreateViewArgs = {
  data: CreateViewInput;
};

export type MutationDeleteViewArgs = {
  viewId: Scalars['String'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationUpdatePreferencesArgs = {
  preferences: UserPreferencesInput;
  username: Scalars['String'];
};

export type MutationUpdateViewArgs = {
  layout: Scalars['ViewLayout'];
  name: Scalars['String'];
  viewId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allIlliquidAssets: Array<Maybe<IlliquidAsset>>;
  allTableScopeViews: Array<Maybe<View>>;
  getGateWayUser?: Maybe<User>;
  illiquidAsset?: Maybe<IlliquidAsset>;
  illiquidAssetPortfolioPositions: Array<Maybe<IlliquidAssetPosition>>;
  illiquidAssetValuations: Array<Maybe<IlliquidAssetValuation>>;
};

export type QueryAllTableScopeViewsArgs = {
  tableScope: Scalars['String'];
};

export type QueryGetGateWayUserArgs = {
  username: Scalars['String'];
};

export type QueryIlliquidAssetArgs = {
  illiquidAssetId: Scalars['String'];
};

export type QueryIlliquidAssetPortfolioPositionsArgs = {
  portfolioId: Scalars['String'];
};

export type QueryIlliquidAssetValuationsArgs = {
  illiquidAssetId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  admin: Scalars['Boolean'];
  coryxId?: Maybe<Scalars['String']>;
  created: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  evoluteId?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  preferences?: Maybe<UserPreferences>;
  type: UserType;
  username: Scalars['String'];
};

export type UserData = {
  __typename?: 'UserData';
  token: Scalars['String'];
  user: User;
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  language: Scalars['String'];
};

export type UserPreferencesInput = {
  language: Scalars['String'];
};

export enum UserType {
  Api = 'Api',
  Business = 'BUSINESS',
  Customer = 'Customer',
  Technical = 'TECHNICAL',
}

export type ValuationInputType = {
  currency: Scalars['String'];
  valuation: Scalars['Float'];
  valuationDate: Scalars['String'];
};

export enum ValuationMethods {
  Direct = 'DIRECT',
  ModifiedDirect = 'MODIFIED_DIRECT',
  PaymentSum = 'PAYMENT_SUM',
  Percent = 'PERCENT',
  Unit = 'UNIT',
  UnitOfArea = 'UNIT_OF_AREA',
}

export type View = {
  __typename?: 'View';
  created: Scalars['String'];
  id: Scalars['ID'];
  isLastUsed: Scalars['Boolean'];
  layout?: Maybe<Scalars['ViewLayout']>;
  name: Scalars['String'];
  tableScope: Scalars['String'];
  user: Scalars['String'];
};

export type NonBankableAssetsQueryVariables = Exact<{
  portfolioId: Scalars['String'];
}>;

export type NonBankableAssetsQuery = {
  __typename?: 'Query';
  illiquidAssetPortfolioPositions: Array<{
    __typename?: 'IlliquidAssetPosition';
    id: string;
    currency: string;
    instrumentTypeName?: string | null;
    marketValue: number;
    timeWeightedReturn: number;
    illiquidAsset: { __typename?: 'IlliquidAsset'; id: string; name: string };
  } | null>;
};

export type IlliquidAssetQueryVariables = Exact<{
  illiquidAssetId: Scalars['String'];
}>;

export type IlliquidAssetQuery = {
  __typename?: 'Query';
  illiquidAsset?: {
    __typename?: 'IlliquidAsset';
    name: string;
    currency: string;
    instrumentType: IlliquidAssetType;
    image?: string | null;
    lastValuation?: {
      __typename?: 'IlliquidAssetValuation';
      valuationDate: string;
      valuation: number;
    } | null;
  } | null;
};

export type CreateIlliquidAssetValuationMutationVariables = Exact<{
  illiquidAssetId: Scalars['String'];
  data: ValuationInputType;
}>;

export type CreateIlliquidAssetValuationMutation = {
  __typename?: 'Mutation';
  createIlliquidAssetValuation?: { __typename?: 'IlliquidAssetValuation'; id: string } | null;
};

export const NonBankableAssetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'NonBankableAssets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'portfolioId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'illiquidAssetPortfolioPositions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'portfolioId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'portfolioId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'instrumentTypeName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'marketValue' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timeWeightedReturn' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'illiquidAsset' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NonBankableAssetsQuery, NonBankableAssetsQueryVariables>;
export const IlliquidAssetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'IlliquidAsset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'illiquidAssetId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'illiquidAsset' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'illiquidAssetId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'illiquidAssetId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'instrumentType' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastValuation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'valuationDate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'valuation' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<IlliquidAssetQuery, IlliquidAssetQueryVariables>;
export const CreateIlliquidAssetValuationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateIlliquidAssetValuation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'illiquidAssetId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ValuationInputType' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createIlliquidAssetValuation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'illiquidAssetId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'illiquidAssetId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateIlliquidAssetValuationMutation,
  CreateIlliquidAssetValuationMutationVariables
>;
