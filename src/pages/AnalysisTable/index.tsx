import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PositionTable from '../../components/PositionTable';
import PortfolioAnalysisHeader from '../../components/PortfolioAnalysisHeader';
import PositionInfoDrawer from '../../components/PositionInfoDrawer';
import PortfolioTransactionTable from '../../components/PortfolioTransactionTable';
import TransactionDetailDrawer from '../../components/TransactionDetailDrawer';
import DashboardDrawer from '../../components/DashboardDrawer';

import { SectionBody } from '../DashBoard/styles';
import { DrawerContainer } from './styles';

import { AppDispatch, RootState } from '../../store';
import { setTabId } from '../../store/transaction/actions';
import { togglePositionDrawer, toggleTransactionDrawer } from '../../store/drawer/actions';

const PortfolioTable = () => {
  const { isOpenPosition, isOpenTransaction } = useSelector(
    (state: RootState) => state.drawer,
  );
  const { portfolios, selectedPortfolio } = useSelector((state: RootState) => state.portfolio);
  const { tabId } = useSelector((state: RootState) => state.transaction);
  const dispatch: AppDispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    dispatch(togglePositionDrawer(false));
    dispatch(toggleTransactionDrawer(false));
  }, [dispatch]);

  const selectHandler = useCallback(
    (selectKey: string, value: number) => {
      dispatch(setTabId(value));
      if (value === 0) dispatch(toggleTransactionDrawer(false));
      else dispatch(togglePositionDrawer(false));
    },
    [dispatch],
  );

  return (
    <>
      <PortfolioAnalysisHeader
        labels={['Positions', 'Transactions']}
        selectedTab={tabId}
        selectHandler={selectHandler}
      />
      <SectionBody style={{ padding: 0, height: 'calc(100% - 82px)' }}>
        {tabId === 0 ? <PositionTable /> : <PortfolioTransactionTable />}
      </SectionBody>
      <PositionInfoDrawer />

      <TransactionDetailDrawer />

      <DrawerContainer
        style={{
          display: isOpenPosition || isOpenTransaction ? 'none' : 'block',
        }}
      >
        <DashboardDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          portfolioId={selectedPortfolio}
          portfolios={portfolios}
          isPortfolioAnalysis
        />
      </DrawerContainer>
    </>
  );
};
export default PortfolioTable;
