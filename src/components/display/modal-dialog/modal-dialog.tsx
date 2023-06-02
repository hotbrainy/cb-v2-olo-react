import React            from 'react';
import Grid             from '@mui/material/Unstable_Grid2';
import {Box}            from '@mui/material';
import {IconButton}     from '@mui/material';
import {Modal}          from '@mui/material';
import {SxProps}        from '@mui/material';
import {Typography}     from '@mui/material';
import brandLogo        from 'src/assets/images/figma/logos/brand-logo.svg';
import CloseIcon        from '@mui/icons-material/Close';
import StandaloneButton from 'src/components/buttons/standalone-button';

interface IModalProps
{
    title: string;
    content: string;
    isOpen?: boolean;
    onClose?: any;
}

interface ITwoButtonDialogProps
{
    title: string;
    content: string;
    isOpen?: boolean;
    onClose?: Function;
    buttonOneText?: string;
    buttonOneSxProps?: SxProps;
    buttonOneClick?: Function;
    buttonTwoText?: string;
    buttonTwoSxProps?: SxProps;
    buttonTwoClick?: Function;
}

interface IContentDialogProps
{
    children: any;
    isOpen?: boolean;
    onClose?: Function;
    buttonOneText?: string;
    buttonOneSxProps?: SxProps;
    buttonOneClick?: Function;
}


const style = {
    position     : 'absolute' as 'absolute',
    top          : '50%',
    left         : '50%',
    transform    : 'translate(-50%, -50%)',
    width        : {xs : 340, sm : 495},
    minHeight    : 495,
    height       : 495,
    bgcolor      : 'background.paper',
    border       : '2px solid #000',
    borderRadius : '12px',
    boxShadow    : `0 4px 8px 2px rgba(0, 0, 0, 0.2)`,
    p            : 2
};

const ModalDialog = (props: IModalProps) => {
    const {title, content, isOpen, onClose} = props;

    return (
        <Modal
            open={isOpen || false}
            onClose={() => onClose?.call(this)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container height="100%">
                    <Grid xs={12} sx={{height : '80%'}}>
                        <Grid container>
                            <Grid xs={1}>
                                <IconButton onClick={() => onClose?.call(this)}>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                            <Grid xs={10} textAlign="center">
                                <img src={brandLogo} height={40} alt={''}/>
                            </Grid>
                            <Grid xs={1}></Grid>
                            <Grid xs={12} m={2}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid xs={12} m={2}>
                                <Typography id="modal-modal-description" sx={{mt : 2}}>
                                    {content}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        xs={12}
                        sx={{height : '20%', alignItems : 'end', display : 'flex', justifyContent : 'center'}}
                    >
                        <StandaloneButton
                            buttonText={'Dismiss'}
                            buttonClick={() => onClose?.call(this)}
                            sx={{
                                height   : {xs : '48px !important', sm : '70px !important'},
                                fontSize : {xs : '24px  !important', sm : '32px !important'}
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default ModalDialog;

export function TwoButtonDialog(props: ITwoButtonDialogProps): React.ReactElement {
    const {title, content, isOpen, onClose, buttonOneClick, buttonTwoClick, buttonOneSxProps, buttonTwoSxProps, buttonOneText, buttonTwoText} = props;

    return (
        <Modal
            open={isOpen || false}
            onClose={() => onClose?.call(this)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container height="100%">
                    <Grid xs={12} sx={{height : '80%'}}>
                        <Grid container>
                            <Grid xs={1}>
                                <IconButton onClick={() => onClose?.call(this)}>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>

                            <Grid xs={10} textAlign="center">
                                <img src={brandLogo} height={40} alt={''}/>
                            </Grid>

                            <Grid xs={1}></Grid>

                            <Grid xs={12} m={2}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {title}
                                </Typography>
                            </Grid>

                            <Grid xs={12} m={2}>
                                <Typography id="modal-modal-description" sx={{mt : 2}}>
                                    {content}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        xs={12}
                        sx={{
                            height         : '20%',
                            alignItems     : 'end',
                            display        : 'flex',
                            justifyContent : 'center'
                        }}
                    >
                        <Grid xs={6}>
                            <StandaloneButton
                                buttonText={buttonOneText || 'Accept'}
                                buttonClick={() => buttonOneClick?.call(this)}
                                sx={{
                                    height   : {xs : '48px !important', sm : '70px !important'},
                                    fontSize : {xs : '24px  !important', sm : '32px !important'},
                                    ...buttonOneSxProps
                                }}
                            />
                        </Grid>

                        <StandaloneButton
                            buttonText={buttonTwoText || 'Cancel'}
                            buttonClick={() => buttonTwoClick?.call(this)}
                            sx={{
                                height   : {xs : '48px !important', sm : '70px !important'},
                                fontSize : {xs : '24px  !important', sm : '32px !important'},
                                ...buttonTwoSxProps
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export function ContentDialog(props: IContentDialogProps): React.ReactElement {
    const {children, isOpen, onClose, buttonOneClick, buttonOneSxProps, buttonOneText} = props;

    return (
        <Modal
            open={isOpen || false}
            onClose={() => onClose?.call(this)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container height="100%">
                    <Grid xs={12} sx={{height : '80%'}}>
                        <Grid container>
                            <Grid xs={1}>
                                <IconButton onClick={() => onClose?.call(this)}>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>

                            <Grid xs={10} textAlign="center">
                                <img src={brandLogo} height={40}/>
                            </Grid>

                            <Grid xs={1}></Grid>

                            <Grid xs={12} m={2}>
                                {children}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        xs={12}
                        sx={{
                            height         : '20%',
                            alignItems     : 'end',
                            display        : 'flex',
                            justifyContent : 'center'
                        }}
                    >
                        <Grid xs={12} display={'flex'} justifyContent="center">
                            <StandaloneButton
                                buttonText={buttonOneText || 'Accept'}
                                buttonClick={() => buttonOneClick?.call(this)}
                                sx={{
                                    height   : {xs : '48px !important', sm : '70px !important'},
                                    fontSize : {xs : '24px  !important', sm : '32px !important'},
                                    ...buttonOneSxProps
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
