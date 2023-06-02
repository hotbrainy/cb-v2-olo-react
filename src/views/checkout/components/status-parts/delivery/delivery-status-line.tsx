import React                from 'react';
import Grid                 from '@mui/material/Unstable_Grid2';
import {fonts}              from '../../../../../shared/styles';
import DeliveryStageDone    from '../../../../../assets/images/Icons/deliveryStageDone.png';
import DeliveryStageCurrent from '../../../../../assets/images/Icons/deliveryStageCurrent.png';
import DeliveryStagePending from '../../../../../assets/images/Icons/deliveryStagePending.png';


export interface IDeliveryStage
{
    stage: string;
    status: string;
    time?: string;
    done?: boolean;
}

export interface IComponentProps
{
    stage: IDeliveryStage;
}


export default function DeliveryStatusLine(props: IComponentProps): React.ReactElement {
    const {stage} = props;

    const stageImage = stage.done
        ? DeliveryStageDone
        : stage.time
            ? DeliveryStageCurrent
            : DeliveryStagePending
    ;

    const localStyles = {
        time   : {
            ...fonts.ceraPro,
            fontSize   : stage.done ? '10px' : '12px',
            fontWeight : stage.done ? '400' : '700',
            lineHeight : '12px'
        },
        stage  : {
            ...fonts.matter,
            fontSize   : '12px',
            lineHeight : '14px',
            fontWeight : '700'
        },
        status : {
            ...fonts.matter,
            fontSize   : '16px',
            lineHeight : '19px',
            fontWeight : '700'
        }
    };

    return (
        <Grid xs={12}>
            <Grid xs={2} alignItems="center" className={'justifyGridCenter'} sx={{...localStyles.time}}>
                {stage.time}
            </Grid>

            <Grid xs={2}>
                <img src={stageImage} height={'40px'} alt="stage icon"/>
            </Grid>

            <Grid xs={8} className={'justifyGridLeft'} paddingY={1}>
                <Grid container className={'justifyGridLeft'} sx={{opacity : stage.time ? 1 : 0.5}}>
                    <Grid xs={12} className={'justifyGridLeft'} sx={{...localStyles.stage}}>
                        {stage.stage}
                    </Grid>

                    <Grid xs={12} className={'justifyGridLeft'} sx={{...localStyles.status}}>
                        {stage.status}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
