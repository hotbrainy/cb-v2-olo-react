import _                    from 'lodash';
import React                from 'react';
import {useEffect}          from 'react';
import {useState}           from 'react';
import Grid                 from '@mui/material/Unstable_Grid2';
import {Checkbox}           from '@mui/material';
import {FormControlLabel}   from '@mui/material';
import {FormGroup}          from '@mui/material';
import {Hidden}             from '@mui/material';
import {Link}               from '@mui/material';
import {SxProps}            from '@mui/material';
import {TextField}          from '@mui/material';
import CheckBoxOutlined     from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import paletteColors        from 'src/theme/paletteColors';
import {fonts, formStyles}  from 'src/shared/styles';

export interface IContactData
{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    signUpForRewards?: boolean;
}

export interface IContactCollectorProps
{
    contactData: IContactData | null;
    linkToLogin: string;
    onChange?: any;
    sxProps?: SxProps;
}

/**
 * Renders a contact collector component
 * sxProps can override element styles
 * .heading is the main heading
 * .linkLine is the line containing linkToLogin
 * .horizontalLine is the line across the center of the form
 * @param {IContactCollectorProps} props
 * @returns {React.ReactElement}
 * @constructor
 */
export function ContactCollector(props: IContactCollectorProps): React.ReactElement {
    const {contactData, linkToLogin, onChange, sxProps} = props;

    //### region: Setup local states
    const [firstName, setFirstName]               = useState(contactData?.firstName || '');
    const [lastName, setLastName]                 = useState(contactData?.lastName || '');
    const [email, setEmail]                       = useState(contactData?.email || '');
    const [phone, setPhone]                       = useState(contactData?.phone || '');
    const [signUpForRewards, setSignUpForRewards] = useState(contactData?.signUpForRewards || false);
    // --
    const [newPassword, setNewPassword]           = useState('');
    const [confirmPassword, setConfirmPassword]   = useState('');
    const [confirmError, setConfirmError]         = useState('');
    const [formatError, setFormatError]           = useState('');
    //### endregion: Setup local states


    // ### region: React to local state change and return values
    const useEffectDependencies = [
        firstName,
        lastName,
        email,
        phone,
        signUpForRewards,
        newPassword,
        confirmPassword
    ];
    useEffect(() => {
        if (!_.isFunction(onChange)) {
            return;
        }

        const passwordPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$');
        const passwordValid   = _.isEmpty(newPassword) || passwordPattern.test(newPassword);
        const passwordMatched = _.isEmpty(confirmPassword) || (newPassword === confirmPassword);
        const hasNewPassword  = passwordValid && passwordMatched && !_.isEmpty(newPassword);

        setFormatError(passwordValid ? '' : 'Password not valid');
        setConfirmError(passwordMatched ? '' : 'Passwords dont match');

        onChange?.call(this, {
            firstName,
            lastName,
            email,
            phone,
            signUpForRewards,
            password : hasNewPassword ? newPassword : ''
        });
    }, useEffectDependencies);
    // ### endregion: React to local state change and return values

    const localStyles = {
        form : {
            ...sxProps,
            ...formStyles.formBuilder,
            '& .MuiInputBase-input' : {
                backgroundColor : 'white'
            },
            '& .MuiGrid2-root'      : {
                padding  : '4px',
                paddingY : '6px'
            },
            lineHeight              : '16px',
            fontSize                : '14px',
            '& .heading'            : {
                ...fonts.portuguesa,
                fontSize   : {xs : '32px', sm : '34px'},
                lineHeight : {xs : '34px', sm : '36px'},
                fontWeight : '700'
            },
            '& .horizontalLine'     : {
                borderBottom : `1px solid ${paletteColors.grey}`
            }
        }
    };

    // TODO: review this... hard-coded stub ???
    const hasLogin = true;

    return (
        <FormGroup>
            <Grid container width="100%" sx={localStyles.form}>
                <Grid xs={12} sm={6} className="heading">
                    Your Contact Info
                </Grid>
                <Grid xs={12} sm={6} sx={{alignItems : 'end !important'}}>
                    All Fields Required
                </Grid>
                <Grid xs={12} sm={6}>
                    <TextField
                        placeholder="First Name"
                        label="First Name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </Grid>

                <Grid xs={12} sm={6}>
                    <TextField
                        placeholder="Last Name"
                        label="Last Name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </Grid>

                <Grid xs={12}>
                    <TextField
                        placeholder="Email"
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Grid>

                <Grid xs={12}>
                    <TextField
                        placeholder="Mobile Number"
                        label="Mobile Number"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </Grid>

                <Grid
                    xs={12}
                    justifyContent="center"
                    className="linkLine"
                    sx={{paddingTop : '18px !important', display : hasLogin ? 'flex' : 'none !important'}}
                >
                    Already have an account?{' '}
                    <Link
                        href={linkToLogin}
                        className="link"
                        sx={{marginLeft : '8px', color : 'black'}}
                    >
                        LOGIN
                    </Link>
                </Grid>

                <Grid xs={12} display={hasLogin ? 'flex' : 'none !important'}>
                    {/* TODO: review this ... doesn't need to be a grid */}
                    <Grid xs={12} className="horizontalLine"></Grid>
                </Grid>

                <Grid xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={<CheckBoxOutlineBlank/>}
                                checkedIcon={<CheckBoxOutlined/>}
                                disableRipple={true}
                                value={signUpForRewards}
                                onChange={(event) => setSignUpForRewards(event.target.checked)}
                            />
                        }
                        label="Sign up for Flame Rewards?"
                    />
                </Grid>

                {signUpForRewards && (<>
                    <Grid xs={12}>
                        <TextField
                            placeholder="New Password"
                            label="New Password"
                            type={'password'}
                            value={newPassword}
                            helperText={formatError}
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                    </Grid>

                    <Grid xs={12}>
                        <TextField
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            type={'password'}
                            value={confirmPassword}
                            helperText={confirmError}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </Grid>
                </>)}
            </Grid>
        </FormGroup>
    );
}
