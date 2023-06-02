import _                            from 'lodash';
import React, {useEffect, useState} from 'react';
// import theme                        from 'src/theme';

// Global Components
import Grid                     from '@mui/material/Unstable_Grid2';
import {Box, Button, TextField} from '@mui/material';
import {fonts}                  from 'src/shared/styles';
import {styles}                 from '../styles';

export interface IPasscodePanelProps
{
    phone: string;
    onChange: Function;
    onSubmit: Function;
    onResend: Function;
    onWrong: Function;
}

export function DrawPasscodePanel(props: IPasscodePanelProps): React.ReactElement {
    const passcodeLength  = 6;
    const placeholderChar = ' ';

    // Initialize passcode with placeholder characters
    const [passcode, setPasscode]                 = useState<string>(placeholderChar.repeat(passcodeLength));
    const [hasValidPasscode, setHasValidPasscode] = useState<boolean>(false);

    // Create passcode TextField references (for improved UX)
    const passcodeTextFieldRefs = _.times(passcodeLength, _ => React.useRef<any | null>(null));

    function focusNextPasscodeTextField(index: number): void {
        // Set focus to next passcode TextField
        if ((index >= 0) && (index < passcodeLength - 1)) {
            passcodeTextFieldRefs[index + 1].current.focus();
        }
    }

    function canContinue(): boolean {
        return passcode
            .split('')
            .reduce((isValid, existingPasscodeChar) => {
                return isValid && isValidPasscodeChar(existingPasscodeChar, false);
            }, true)
            ;
    }

    function setPasscodeAtIndex(index: number, value: string): void {
        if (isValidPasscodeChar(value, true) && (index >= 0) && (index < passcodeLength)) {
            // Update the passcode character at the specified index
            const newPasscode = passcode.replace(/./g, (existingPasscodeChar, ii) => {
                return (ii === index)
                    ? (value || placeholderChar) // assign new value (or placeholder character)
                    : existingPasscodeChar       // retain existing character
                    ;
            });
            setPasscode(newPasscode);

            if (!_.isEmpty(value)) {
                focusNextPasscodeTextField(index);
            }
        }
    }

    function isValidPasscodeChar(value: string[1], allowEmpty: boolean): boolean {
        return (allowEmpty && _.isEmpty(value)) || /^[0-9]$/.test(value);
    }

    useEffect(() => {
        setHasValidPasscode(canContinue());
        props.onChange?.call(this, passcode);
    }, [passcode]);


    return (
        <Grid container width="100%" sx={{maxWidth : {xs : '100%', sm : '740px'}}}>
            <Grid
                xs={12}
                sx={{
                    ...fonts.portuguesa,
                    fontWeight : '400',
                    fontSize   : '40px',
                    lineHeight : '32px'
                }}
                className={'profileHeader justifyGridCenter'}
            >
                {`Sign up Flame Rewards`}
            </Grid>

            <Grid
                xs={12}
                sx={{
                    ...fonts.matter,
                    fontWeight : '400',
                    fontSize   : '20px',
                    lineHeight : '30px'
                }}
                className={'justifyGridCenter'}
            >
                {`We sent a one time passcode to ${props.phone}. Please enter it below.`}
            </Grid>

            <Grid xs={12} justifyContent="center">
                <Grid container width="75%" sx={styles.inputFields}>
                    {_.times(passcodeLength, (ii) => (
                        <Grid xs={2} key={`passcode-char-${ii}`}>
                            {/* Render a TextField per passcode digit */}
                            <TextField
                                type="text"
                                autoFocus={ii === 0}
                                onFocus={(event) => event.target.select()} // select all existing text
                                inputRef={passcodeTextFieldRefs[ii]}
                                inputProps={{
                                    maxLength  : 1,
                                    onKeyPress : (event) => {
                                        const {key} = event;
                                        if (key === 'Enter') {
                                            if (!_.isEmpty(passcodeTextFieldRefs[ii].current.value)) {
                                                focusNextPasscodeTextField(ii);
                                            }
                                        }
                                    }
                                }}
                                // Don't display the passcode placeholder character (only display digits or empty)
                                value={(passcode[ii] || '').trim()}
                                onChange={(event) => setPasscodeAtIndex(ii, event.target.value)}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                <Button
                    variant="contained"
                    disabled={!hasValidPasscode}
                    sx={{...styles.button, lineHeight : '14px'}}
                    onClick={() => props.onSubmit?.call(this, passcode)}
                >
                    {`Continue`}
                </Button>
            </Grid>

            <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                <Box
                    marginTop={4}
                    marginBottom={4}
                    sx={styles.forgotPasswordLink}
                    onClick={() => props.onResend?.call(this)}
                >
                    {/* TODO: review this... what does (29) mean ??? */}
                    {`Resend Code (29)`}
                </Box>
            </Grid>

            <Grid xs={12} className="justifyGridCenter" sx={{...styles.form, ...styles.centeredGrid}}>
                <Box
                    marginTop={4}
                    marginBottom={4}
                    sx={{...styles.forgotPasswordLink, marginTop : 0}}
                    onClick={() => props.onWrong?.call(this)}
                >
                    {`My Mobile Number is wrong`}
                </Box>
            </Grid>
        </Grid>
    );
}
