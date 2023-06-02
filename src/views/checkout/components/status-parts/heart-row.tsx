import _           from 'lodash';
import React       from 'react';
import Grid        from '@mui/material/Unstable_Grid2';
import orangeHeart from '../../../../assets/images/Icons/orangeHeart.png';


export interface IComponentProps
{
    count?: number | null;
    height?: string | null;
}


export default function HeartRow(props: IComponentProps): React.ReactElement {
    const {count, height} = props;

    return (
        <Grid xs={12} paddingY={2} alignItems={'end'} sx={{'& img' : {marginX : '8px'}}}>
            {
                _.times(count || 3).map((value, index) => (
                    <img
                        src={orangeHeart}
                        height={height || '24px'}
                        alt="Orange Heart"
                        key={`heart-${index}`}
                    />
                ))
            }
        </Grid>
    );
}
