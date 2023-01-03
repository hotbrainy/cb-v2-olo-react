import React from 'react';

// import './pillar.css';

interface IPillarProps
{
    id: string;
    name: string;
    imageUrl: string;
}

export default function Pillar(props: IPillarProps): JSX.Element {
    const {id, name, imageUrl} = props;

    return (
        <div
            style={{
                display        : 'flex',
                flexDirection  : 'column',
                maxWidth       : '300px',
                justifyContent : 'flex-start',
                alignItems     : 'center'
            }}
        >
            <img
                // src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F7284d0c135d74115b423db55a026ce44"
                src={imageUrl}
                style={{
                    backgroundPosition : 'center',
                    backgroundSize     : 'contain',
                    //aspectRatio={1.0069444444444444},
                    display   : 'flex',
                    position  : 'relative',
                    minWidth  : '20px',
                    minHeight : '20px',
                    maxWidth  : '144px',
                    width     : '144px'
                }}
            />
            <div
                style={{
                    maxWidth      : '265px',
                    marginTop     : '35px',
                    color         : 'rgba(0, 0, 0, 1)',
                    fontSize      : '32px',
                    letterSpacing : '0%',
                    textAlign     : 'center',
                    fontFamily    : '"Cera", sans-serif'
                }}
            >
                Pillar One
            </div>
            <div
                style={{
                    maxWidth      : '300px',
                    marginTop     : '35px',
                    color         : 'rgba(0, 0, 0, 1)',
                    fontSize      : '14px',
                    lineHeight    : '20px',
                    letterSpacing : '0%',
                    textAlign     : 'center',
                    fontFamily    : '"Cera PRO", sans-serif'
                }}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rhoncus
                purus eros. Pellentesque vel sollicitudin eros, nec dictum ipsum.{' '}
            </div>
        </div>
    );
}
