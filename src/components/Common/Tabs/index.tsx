import { Box } from '@mui/material';
import { useState, useEffect, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { Tabs as StyledTabs, Tab } from './styles';
import { selectTranslations } from '../../../store/i18n/reducer';
import { handleTranslations } from '../../../store/i18n/handleTranslations';

interface StyledTabsProps {
  tabName: string;
  labels: string[];
  style?: any;
  selectedId?: number;
  selectHandler: (selectKey: string, value: number) => void;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Tabs = ({
  tabName,
  labels,
  selectHandler,
  style,
  selectedId = 0,
}: StyledTabsProps) => {
  const t = useSelector(selectTranslations);

  const [value, setValue] = useState(selectedId);

  useEffect(() => {
    setValue(selectedId);
  }, [selectedId]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    selectHandler(tabName, newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <StyledTabs value={value} onChange={handleChange} aria-label='styled tabs'>
          {labels.map((label, id) => (
            <Tab
              key={label}
              label={handleTranslations(t, label)}
              {...a11yProps(id)}
              sx={style}
            />
          ))}
        </StyledTabs>
      </Box>
    </Box>
  );
};
