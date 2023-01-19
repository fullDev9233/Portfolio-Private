export type PortfolioTableData = {
  parentId?: string;
  name: string;
  id: string;
  TotalGainLoss: number;
  SpecCons: string;
  PercentPortfolio: number;
  AssetClassName?: string;
  LongShort: string;
  CurrencyGainLoss: number;
  MarketValueCum: number;
  PercentSegment: number;
  PriceGainLoss: number;
  AccruedInterest: number;
  Earnings: number;
  AssetClass?: string;
  PurchaseValue: number;
};

export interface PerformerProps {
  barColorToggleFlag: number;
  description1: string;
  distributionToPaidIn: number;
  end: string;
  endDate: string;
  finalValue: number;
  footnoteList: any[];
  grouping: string;
  inflows: number;
  initialValue: number;
  instrType: string;
  performance: number;
  reportCcy: string;
  result: number;
  returns: number;
  secID: string;
  secShortcode: string;
  secShortcodeSort: string;
  security: string;
  securitySort: string;
  segmentAttr: number;
  sortInterestRate: number;
  sorting: number;
  sorting2: number;
  sorting3: number;
  start: string;
  startDate: string;
  taxes: number;
  title1: string;
  title2: string;
  totalValueToPaidIn: number;
  yield: number;
  yieldPA: number;
}

export interface PerformersProps {
  bestPerformers: PerformerProps[];
  worstPerformers: PerformerProps[];
}

export interface MaturityProps {
  barColorToggleFlag: number;
  basisPointValue: number;
  convexity: number;
  decimalPlaces: number;
  decimalPlacesReport: number;
  duration: number;
  endDate: string;
  footnoteList: any[];
  groupingTypeName: string;
  instrCcy: string;
  instrType: number;
  instrTypeName: string;
  maturity: string;
  maturityYears: number;
  modDuration: number;
  numbersInstrCcy: number;
  numbersReportCcy: number;
  reportCcy: string;
  reportTitle: string;
  secShortcode: string;
  security: string;
  shareSegment: number;
  shareTotal: number;
  sortInterestRate: number;
  sorting: number;
  title1: string;
  title2: string;
  totalValue: number;
  yieldToMaturity: number;
}

export interface MaturitiesProps {
  maturities: MaturityProps[];
}

export interface AllocationProps {
  axisLabel: string;
  valueBigDecimal: number;
  valueLabel: string;
}

export interface DailyPerformanceProps {
  title1: string;
  title2: string;
  startDate: string;
  endDate: string;
  reportCcy: string;
  grouping: string;
  sort1: number;
  sorting: number;
  creditAmount: number;
  debitAmount: number;
  endValue: number;
  fee: number;
  tax: number;
  effectiveDay: string;
  effectiveDayText: string;
  perfEffectiveDay: number;
  performance: number;
  endOfMonthCount: number;
  reportTitle: string;
  barColorToggleFlag: number;
  groupingTypeName: string;
  entityTypeName: string;
  compareObjectTyp1: string;
  performanceStartDate: string;
  footnoteList: string[];
}

export interface AllocationsProps {
  assetClassAllocations: AllocationProps[];
  currencyAllocations: AllocationProps[];
}

export interface PortfolioState {
  isLoading: boolean;
  performersIsLoading: boolean;
  maturitiesIsLoading: boolean;
  allocationsIsLoading: boolean;
  dailyPerformanceIsLoading: boolean;
  tableDataIsLoaded: boolean;
  portfolioTableData: object;
  portfolios: string[];
  dashboardPortfolios: [];
  transactions: TransactionReportProps[];
  performers: PerformersProps;
  maturities: MaturitiesProps;
  allocations: AllocationsProps;
  dailyPerformance: DailyPerformanceProps[];
  assetClasses: string[];
  selectedPortfolio: string;
  portfolioId: string;
  error: string;
  isDashboardMount: boolean;
  isPAMount: boolean;
  isPATransactionMount: boolean;
}

export interface ContextMenuDataLoadStatusProps {
  instrument: boolean;
  position: boolean;
  transaction: boolean;
}

export interface TransactionReportProps {
  title1: string;
  title2: string;
  portfolioItem: string;
  portfolioShortcodeItem: string;
  startDate: string;
  endDate: string;
  bank: string;
  secAcc: string;
  seqNo: string;
  modDate: string;
  transModUser: string;
  transTypeName: string;
  instrTypeName: string;
  transStateName: string;
  transNo: string;
  entryDate: string;
  valueDate: string;
  tradeDate: string;
  security: string;
  secShortcode: string;
  numbersTrdCcy: number;
  decimalPlacesTrd: number;
  secPrice: number;
  trdCcy: string;
  marketValTrdCcy: number;
  assetValNeutral: number;
  posBank: string;
  posAccSecAcc: string;
  marketValue: number;
  reportCcy: string;
  accrInterest: number;
  exchange: string;
  accrIntTrdCcy: number;
  instrType: number;
  tradeTimeStamp: string;
  segmentAttr: number;
  grouping: string;
  transId: string;
  openClose: string;
  fees: number;
  feesTrdCcy: number;
  shortVersion: false;
  barColorToggleFlag: number;
  groupingTypeName: string;
  reportRequestType: number;
  description1: string;
  description2: string;
  description3: string;
  taxes: number;
  taxesTrdCcy: number;
  depositoryName: string;
  custodyTypeName: string;
  footnoteList: [];
}

export interface DrawerProps {
  isOpenPosition: boolean;
  isExpandPosition: boolean;
  isOpenTransaction: boolean;
  isOpenAssetDetail: boolean;
  isOpenAddValuation: boolean;
}
