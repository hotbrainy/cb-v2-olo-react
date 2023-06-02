import './swipe-button.css';
import React      from 'react';
import {useState} from 'react';
import {Box}      from '@mui/material';
import {fonts}    from 'src/shared/styles';

export interface ISwipeButtonProps {
  slideColor: string;
  slideColorUnlocked?: string;
  circleColor: string;
  circleTextColor: string;
  slideText: string;
  slideUnlockedText: string;
  onChange: any;
}

const slider = React.createRef();
const container = React.createRef();

export function SwipeButton(props: ISwipeButtonProps) {
  const {
    slideColor,
    slideColorUnlocked,
    circleColor,
    circleTextColor,
    slideText,
    slideUnlockedText,
    onChange,
  } = props;
  const [unlocked, setUnlocked] = useState(false);

  const toggleCooking = () => {
    setUnlocked(!unlocked);
    onChange?.call(this, !unlocked);
  };

  return (
    <div className="ReactSwipeButton" onClick={toggleCooking}>
      <Box
        className={"rsbContainer "}
        ref={container}
        sx={{ background: unlocked ? (slideColorUnlocked || slideColor) : slideColor }}
      >
        <Box
          className="rsbcSlider"
          ref={slider}
          sx={{
            background: unlocked ? (slideColorUnlocked || slideColor) : slideColor,
            left: { xs: unlocked ? "319px !important" : "75px !important", sm: unlocked ? "360px !important" : "75px !important" },
          }}
        >
          <Box className="rsbcSliderText" sx={{...fonts.portuguesa}}>
            {unlocked ? slideUnlockedText : slideText}
          </Box>
          <Box
            className="rsbcSliderArrow"
            sx={{
              borderRightColor: unlocked ? slideColorUnlocked : slideColor,
              borderTopColor: unlocked ? slideColorUnlocked : slideColor,
              //right: { xs: unlocked ? "170px" : "35px", sm: "35px" },
            }}
          ></Box>
          <Box
            className="rsbcSliderCircle"
            sx={{
              backgroundColor: circleColor,
              color: circleTextColor,
              border: `2px solid ${unlocked ? slideColorUnlocked : circleTextColor}`,
              //right: { xs: unlocked ? "140px" : "0px", sm: "0px" },
            }}
          ></Box>
        </Box>
        <Box
          className="rsbcText"
          sx={{
              ...fonts.portuguesa,
              fontSize:"18px",
              paddingLeft: !unlocked ? "35px" : "",
              right: { xs: unlocked ? "50px" : "", sm: "" }
          }}
        >
          {!unlocked ? slideText : slideUnlockedText}
        </Box>
      </Box>
    </div>
  );
}
