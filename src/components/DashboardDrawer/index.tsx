import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import AssetChart from '../AssetChart';
import PerformerChart from '../PerformerChart';
import { RootState } from '../../store';
import { selectTranslations } from '../../store/i18n/reducer';
import { handleTranslations } from '../../store/i18n/handleTranslations';
import { Tabs } from '../Common/Tabs';
import { Container, AllocationsHeader, StyledButton } from './styles';
import SliderCollapseCloseIcon from '../../assets/SliderCollapseIcon';
import SliderCollapseOpenIcon from '../../assets/SliderCollapseOpenIcon';

interface DashboardDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  portfolioId: string;
  portfolios: [];
  isPortfolioAnalysis?: boolean;
}

const DashboardDrawer = ({
  isOpen,
  setIsOpen,
  portfolioId,
  portfolios,
  isPortfolioAnalysis,
}: DashboardDrawerProps) => {
  const theme = useTheme();
  const { dailyPerformance } = useSelector((state: RootState) => state.portfolio);
  const t = useSelector(selectTranslations);

  const [selectedPortfolio, setSelectedPortfolio] = useState<any>();

  useEffect(() => {
    if (portfolios?.length > 0) {
      const filteredPortfolio = portfolioId
        ? portfolios.filter((portfolio: any) => portfolio?.id === portfolioId)
        : portfolios;
      setSelectedPortfolio(filteredPortfolio[0]);
    }
  }, [portfolios, portfolioId]);

  const [selectedTab, setSelectedTab] = useState(0);

  const selectHandler = useCallback((selectKey: string, value: number) => {
    setSelectedTab(value);
  }, []);

  return (
    <Container className='dashboard-drawer' isopen={`${isOpen}`}>
      <StyledButton
        isopen={`${isOpen}`}
        startIcon={
          isOpen ? (
            <SliderCollapseCloseIcon style={{ width: '12px', height: '12px' }} />
          ) : (
            <SliderCollapseOpenIcon style={{ width: '12px', height: '12px' }} />
          )
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen && selectedPortfolio?.portfolio_name}
      </StyledButton>

      {isOpen && (
        <div
          style={{
            height: isPortfolioAnalysis ? 'calc(100vh - 112px)' : 'auto',
            overflowY: isPortfolioAnalysis ? 'scroll' : 'inherit',
          }}
        >
          <section className='portfolio'>
            {dailyPerformance && dailyPerformance.length > 0 ? (
              <>
                <Box sx={{ margin: '20px 20px 0' }}>
                  <Typography variant='h4' sx={{ color: theme.palette.primary.dark }}>
                    {selectedPortfolio?.portfolio_name}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: theme.palette.black.light, marginTop: '5.5px' }}
                  >
                    {dailyPerformance[0]?.startDate && dailyPerformance[0]?.endDate
                      ? `${format(
                          new Date(dailyPerformance[0].startDate),
                          'dd.MM.yyyy',
                        )} - ${format(new Date(dailyPerformance[0].endDate), 'dd.MM.yyyy')}`
                      : ''}
                  </Typography>
                </Box>

                <PerformerChart
                  ccy={selectedPortfolio?.ccy}
                  marketValue={selectedPortfolio?.current_value}
                  data={dailyPerformance}
                  ytdPerformance={selectedPortfolio?.ytd_performance}
                />
              </>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                  margin: '20px 20px 0',
                }}
              >
                <CircularProgress />
              </div>
            )}
          </section>
          <section className='allocations' style={{ marginTop: 25 }}>
            <AllocationsHeader>
              <Typography variant='h4' sx={{ color: theme.palette.primary.dark }} mb={1.5}>
                {handleTranslations(t, 'Allocations')}
              </Typography>
              <Tabs
                tabName='overview'
                labels={['Currency', 'Asset']}
                selectedId={selectedTab}
                selectHandler={selectHandler}
              />
            </AllocationsHeader>
            <AssetChart selectedTab={selectedTab} />
          </section>
        </div>
      )}
    </Container>
  );
};

export default DashboardDrawer;
