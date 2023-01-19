import CircularProgress from '@mui/material/CircularProgress';
// import { useTheme } from '@mui/material/styles';
// import NorthEastIcon from '@mui/icons-material/NorthEast';
// import SouthEastIcon from '@mui/icons-material/SouthEast';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Cell, PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

import { Dot, Flex, LabelsWrapper, Typography } from './styles';
import { RootState } from '../../store';
import { formatNumbers } from '../../utils/formatNumbers';

const colors = [
  '#6859A3',
  '#C2BCDA',
  '#0066B2',
  '#99C2E0',
  '#BDA173',
  '#E5D9C7',
  '#47B5FF',
  '#FFEA11',
  '#BCA076',
  '#85F4FF',
];
const lightColors = [
  '#A59CC8',
  '#E1DEED',
  '#67A3D1',
  '#CDE1F0',
  '#D7C7AB',
  '#F2EDE3',
  '#47B5FF50',
  '#FFEA1150',
  '#BCA07650',
  '#85F4FF50',
];

interface AssetChartProps {
  selectedTab: number;
}

const renderActiveShape = (props: any, currentLocale: string) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, percent } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fontSize={28} fill='#202124'>
        {formatNumbers(percent * 100, currentLocale)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const AssetChart = ({ selectedTab }: AssetChartProps) => {
  // const theme = useTheme();
  const { allocations, allocationsIsLoading } = useSelector(
    (state: RootState) => state.portfolio,
  );
  const { selectedLanguage, supportedLangs }: any = useSelector(
    (state: RootState) => state.i18n,
  );
  const currentLocale = supportedLangs[selectedLanguage];

  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedTab === 0) setData(allocations.currencyAllocations);
    else setData(allocations.assetClassAllocations);
  }, [allocations, selectedTab]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      {allocationsIsLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            margin: '20px 0 12px',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '232px',
              padding: '20px 0 12px',
              borderTop: '1px solid #dfe5ec',
            }}
          >
            {data && data.length > 0 ? (
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart width={400} height={400}>
                  <Pie
                    isAnimationActive={false}
                    data={data}
                    dataKey='valueBigDecimal'
                    cx='50%'
                    cy='50%'
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={50}
                    outerRadius={60}
                    paddingAngle={2}
                  >
                    {data &&
                      data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={lightColors[index % lightColors.length]}
                        />
                      ))}
                  </Pie>
                  <Pie
                    isAnimationActive={false}
                    activeIndex={activeIndex}
                    activeShape={(props) => renderActiveShape(props, currentLocale)}
                    data={data}
                    dataKey='valueBigDecimal'
                    cx='50%'
                    cy='50%'
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    onMouseEnter={onPieEnter}
                  >
                    {data &&
                      data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <></>
            )}
          </div>
          <div style={{ overflow: 'auto', height: data && data.length > 3 ? 118.5 : '100%' }}>
            <LabelsWrapper>
              {data &&
                data.map((entry: any, index) => (
                  <Flex
                    key={`label-${index}`}
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}
                  >
                    <Flex>
                      <Dot active={`${activeIndex === index}`} bg={colors[index]} />
                      <Typography
                        variant='subtitle2'
                        active={`${activeIndex === index}`}
                        sx={{ fontWeight: 700 }}
                      >
                        {entry.axisLabel}
                      </Typography>
                    </Flex>
                    <Flex>
                      <Typography
                        variant='subtitle2'
                        active={`${activeIndex === index}`}
                        mr={1}
                      >
                        {formatNumbers(entry.valueBigDecimal, currentLocale)}%
                      </Typography>
                      {/* {entry.valueBigDecimal >= 0 ? (
                  <NorthEastIcon
                    sx={{
                      color: theme.palette.green.dark,
                      opacity: activeIndex === index ? 1 : 0.3,
                    }}
                  />
                ) : (
                  <SouthEastIcon
                    sx={{
                      color: theme.palette.red.dark,
                      opacity: activeIndex === index ? 1 : 0.3,
                    }}
                  />
                )} */}
                    </Flex>
                  </Flex>
                ))}
            </LabelsWrapper>
          </div>
        </>
      )}
    </>
  );
};

export default AssetChart;
