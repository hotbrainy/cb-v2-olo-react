import React from 'react';

// MUI Components
import {Box}              from '@mui/material';
import {Button}           from '@mui/material';
import {Checkbox}         from '@mui/material';
import {FormControlLabel} from '@mui/material';
import Grid               from '@mui/material/Unstable_Grid2';
import {TextField}        from '@mui/material';
import {Typography}       from '@mui/material';

import {Theme}    from '@mui/material/styles';
import {useTheme} from '@mui/material/styles';

import {SxProps} from '@mui/system';

interface ISignUpProps
{
    title: string;
    sx?: SxProps<Theme>;
}

interface IDummyModel
{
    errors: any;
    values: any;
    touched: any;
    handleChange: () => void;
}


export default function Content(props: ISignUpProps): JSX.Element {
    const {title, sx} = props;

    const theme = useTheme();

    const joinReasons = [
        'Get the s(coop) on the latest Chicken Treat offers',
        'Get more access to your fave deals',
        'Invitations to exclusive events and tastings'
    ];

    // TODO: review formik library
    const formik = {
        errors       : {},
        values       : {},
        touched      : {},
        handleChange : (): void => {}
    } as IDummyModel;

    return (
        <>
            <Box sx={{p : 3, ...sx}}>
                <Typography variant="h2" align="center" sx={{mb : 5}}>
                    {title}
                </Typography>

                <Grid container sx={{m : 2}}>
                    <Grid maxWidth="xs" xs={12}>
                        <Typography>
                            Why Join
                        </Typography>
                    </Grid>

                    {joinReasons.map((reason, ii) => (
                        <Grid maxWidth="xs" xs={12} key={`join-reason-${ii}`}>
                            <Typography>
                                {reason}
                            </Typography>
                        </Grid>
                    ))}

                    <Grid maxWidth="xs" xs={12}>
                        <form noValidate autoComplete="off" onSubmit={() => {}}>
                            <Grid container spacing={2}>
                                <Grid xs={12}>
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        fullWidth
                                        type="text"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                        helperText={formik.touched.fullName && formik.errors.fullName}
                                    />
                                </Grid>

                                <Grid xs={12}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        fullWidth
                                        type="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>

                                <Grid xs={12}>
                                    <TextField
                                        label="Suburb"
                                        name="suburb"
                                        fullWidth
                                        type="text"
                                        value={formik.values.suburb}
                                        onChange={formik.handleChange}
                                        error={formik.touched.suburb && Boolean(formik.errors.suburb)}
                                        helperText={formik.touched.suburb && formik.errors.suburb}
                                    />
                                </Grid>

                                <Grid xs={12}>
                                    <TextField
                                        label="Mobile Number"
                                        name="mobileNo"
                                        fullWidth
                                        type="text"
                                        value={formik.values.mobileNo}
                                        onChange={formik.handleChange}
                                        error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                                        helperText={formik.touched.mobileNo && formik.errors.mobileNo}
                                    />
                                </Grid>

                                <Grid xs={12}>
                                    <FormControlLabel
                                        value="checked"
                                        control={<Checkbox/>}
                                        label="I agree to receive communications from Chicken Treat and have read and understood the privacy policy."
                                        labelPlacement="end"
                                    />
                                </Grid>

                                <Grid xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        sx={{
                                            width : {sx : '170px', lg : '210px'},
                                            p     : 1,
                                            mx    : 'auto',
                                            mt    : 5,
                                            mb    : 3
                                        }}
                                    >
                                        {'Sign Up'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
