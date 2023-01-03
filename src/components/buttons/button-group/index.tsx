import React               from 'react';
import {ToggleButtonGroup} from '@mui/material';
import {ToggleButton}      from '@mui/material';
import {styled, Theme}     from '@mui/material/styles';
import {SxProps}           from '@mui/system';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => {
    const borderRadius = '24px';

    return {
        borderRadius,
        color           : theme.palette.common.white,
        backgroundColor : theme.palette.common.grey,

        '& .MuiToggleButtonGroup-grouped' : {
            fontFamily      : 'Cera',
            fontStyle       : 'normal',
            fontWeight      : 900,
            fontSize        : '24px',
            lineHeight      : '24px',
            textTransform   : 'none',
            color           : theme.palette.common.white,
            backgroundColor : 'transparent',
            minWidth        : '240px',

            '&.Mui-selected'        : {
                border          : `1px solid ${theme.palette.common.grey}`,
                borderRadius,
                color           : theme.palette.common.red,
                backgroundColor : theme.palette.common.white
            },
            '&:not(:first-of-type)' : {borderRadius},
            '&:first-of-type'       : {borderRadius}
        }
    };
});


export interface IOption
{
    id: string;
    title: string;
}

export interface IComponentProps
{
    defaultSelectedId: string;
    options: ReadonlyArray<IOption>;
    onSelected?: (optionId: string) => void;
    sx?: SxProps<Theme>;
}

export default function ButtonGroup(props: IComponentProps): JSX.Element {
    const {onSelected} = props;

    const [selectedOption, setSelectedOption] = React.useState<string>(props.defaultSelectedId);
    const handleSelection                     = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
        setSelectedOption(newValue);
        if (onSelected) {
            onSelected(newValue);
        }
    };

    return (
        <StyledToggleButtonGroup
            value={selectedOption}
            onChange={handleSelection}
            exclusive
            sx={{width : 'fit-content', ...props.sx}}
        >
            {props.options.map((option, ii) => (
                <ToggleButton
                    key={`option-${ii}`}
                    value={option.id}
                    disabled={selectedOption === option.id}
                    disableFocusRipple
                    disableRipple
                >
                    {option.title}
                </ToggleButton>
            ))}
        </StyledToggleButtonGroup>
    );
}
