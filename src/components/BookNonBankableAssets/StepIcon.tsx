import { StepIconProps } from '@mui/material';
import EtopsStepIcon from '../../assets/EtopsStepIcon';
import { EtopsStepIconRoot } from './styles';

export const EtopsStepCheckIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return (
    <EtopsStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? (
        <EtopsStepIcon
          className='EtopsStepIcon-completedIcon'
          style={{ width: 20, height: 20 }}
        />
      ) : (
        <div className='EtopsStepIcon-circle' />
      )}
    </EtopsStepIconRoot>
  );
};
