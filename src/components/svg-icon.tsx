import * as React              from 'react';
import {SvgIcon as MuiSvgIcon} from '@mui/material';
import {SvgIconProps}          from '@mui/material';
import {styled}                from '@mui/material';

const SvgIcon = styled(MuiSvgIcon, {
    name              : 'MopeimIcon',
    shouldForwardProp : (prop) => prop !== 'fill'
})`
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.25px;
`;

SvgIcon.defaultProps = {
    viewBox       : '0 0 24 24',
    focusable     : 'false',
    'aria-hidden' : 'true'
};

const Mopeim: React.FunctionComponent<SvgIconProps> = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d="M15,19.16V15.07a4.27,4.27,0,0,0,6,0h0a4.27,4.27,0,0,0,0-6h0a4.27,4.27,0,0,0-6,0l-3,3-3,3a4.27,4.27,0,0,1-6,0h0a4.27,4.27,0,0,1,0-6h0A4.27,4.27,0,0,1,9,9"/>
        </SvgIcon>
    );
};

export default Mopeim;
