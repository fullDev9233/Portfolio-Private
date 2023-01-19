import { SvgIcon } from '@mui/material';

const CloseIcon = ({ ...props }) => {
  return (
    <SvgIcon viewBox='0 0 13.001 12.889' {...props}>
      <g id='close_icon' data-name='close icon' transform='translate(0.5 0.5)'>
        <path
          id='Union_7'
          data-name='Union 7'
          d='M6499.527,20826.627l-4.553-4.553-4.552,4.553a.86.86,0,0,1-1.213-1.213l4.472-4.473-4.472-4.471a.862.862,0,0,1,1.213-1.219l4.552,4.559,4.553-4.559a.863.863,0,0,1,1.474.607.881.881,0,0,1-.251.611l-4.472,4.471,4.472,4.473a.86.86,0,0,1,.251.611.842.842,0,0,1-.256.605.857.857,0,0,1-1.218,0Z'
          transform='translate(-6489 -20814.998)'
          fill={props.color || '#074682'}
          stroke='rgba(0,0,0,0)'
          strokeWidth='1'
        />
      </g>
    </SvgIcon>
  );
};

export default CloseIcon;
