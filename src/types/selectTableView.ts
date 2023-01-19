export interface ModalParamsProps {
  title: string;
  content: string;
  okName: string;
  cancelName: string;
}

export enum TableViewScope {
  PORTFOLIO_POSITIONS = 'PORTFOLIO_POSITIONS',
  PORTFOLIO_TRANSACTIONS = 'PORTFOLIO_TRANSACTIONS',
}
