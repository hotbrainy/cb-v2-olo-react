import _                         from 'lodash';
import React                     from 'react';
import {useState}                from 'react';
import {useCallback}             from 'react';
import {Grid}                    from '@mui/material';
import {InputBaseComponentProps} from '@mui/material';
import {InputBase}               from '@mui/material';
import {Paper}                   from '@mui/material';
import {SxProps}                 from '@mui/system';
import {InputBaseProps}          from '@mui/material/InputBase/InputBase';
import paletteColors             from 'src/theme/paletteColors';

// import {Autocomplete}            from '@mui/material';

interface IComponentProps extends InputBaseProps
{
    items: ReadonlyArray<any>;
    filter: (query: string) => void;
    onSelect: (ctx: any) => void;
    displayPath?: string | null;
    extendedDisplayPath?: string[] | null;
    loading?: boolean;
    loadingText?: string;
    noResultsText?: string;
    // placeholder: string;
    waitInterval?: number;
    // --
    sx?: SxProps;
    inputProps?: InputBaseComponentProps;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    containerSx?: SxProps;
    value?: string;
}

const styles = {
    candidates : {
        cursor : 'pointer',
        '& ul' : {
            '& li' : {
                paddingLeft  : '12px',
                fontSize     : {xs : '12px', sm : 'inherit'},
                borderRadius : '8px',
                '&:hover'    : {
                    backgroundColor : `${paletteColors.black}10`
                }
            }
        }
    }
};

export default function SearchInput(props: IComponentProps): React.ReactElement {
    const {inputProps, sx, startIcon, endIcon, containerSx, value} = props;

    const [inputValue, setInputValue] = useState(value || '');

    const debouncedInput = useCallback(_.debounce((query) => {
        return props.filter(query);
    }, props.waitInterval || 500), []);

    function updateValue(value: string): void {
        setInputValue(value);
        debouncedInput(value);
    }

    function sendResult(value: any): void {
        props.onSelect(value);
        setInputValue('');
    }

    const content = props.loading
        ? (<li>{props.loadingText || 'Loading...'}</li>)
        : (
            _.isEmpty(props.items)
                ? (<li>{props.noResultsText || 'No Results'}</li>)
                : props.items.map((value, index) => (
                    <li
                        key={`search-result-${index}`}
                        onClick={() => sendResult(value)}
                    >
                        {props.extendedDisplayPath
                            ? value.suburb === '...more'
                                ? '...more'
                                : props.extendedDisplayPath.map((fld: string) => (_.get(value, fld || '', ''))).join(', ')
                            : _.get(value, props.displayPath || '', value)
                        }
                    </li>
                ))
        )
    ;

    return (
        // <Autocomplete renderInput={} options={}/>

        <Grid container sx={{...containerSx}}>
            <Grid xs={12} item={true}>
                <Paper
                    elevation={0}
                    sx={{
                        // Defaults
                        p          : '2px 4px',
                        display    : 'flex',
                        alignItems : 'center',
                        width      : 400,

                        // Overrides
                        ...sx
                    }}
                >
                    {startIcon}

                    <InputBase
                        value={inputValue}
                        onChange={(e: any) => updateValue(e.target.value)}
                        inputProps={inputProps}
                        sx={{
                            fontFamily : 'Matter',
                            fontStyle  : 'normal',
                            fontWeight : 400,
                            fontSize   : {xs : '16px', lg : '20px'},
                            lineHeight : {sx : '20px', lg : '24px'},
                            // --
                            ml   : 1,
                            flex : 1
                            // ...inputProps?.sx
                        }}
                    />

                    {endIcon}
                </Paper>
            </Grid>

            {/* TODO: float these results below the search input box */}
            {!_.isEmpty(props.items) && (
                <Grid xs={12} item={true} sx={styles.candidates}>
                    <ul>{content}</ul>
                </Grid>
            )}
        </Grid>
    );
}
