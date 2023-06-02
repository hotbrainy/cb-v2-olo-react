import _ from "lodash";
import React, { useEffect, useState } from "react";

// Global Components
import Grid from "@mui/material/Unstable_Grid2";
import ButtonGroup from "src/components/buttons/button-group";
import { styles } from "../styles";
import { flameStyles } from "./flame-rewards/flame-styles";
import { DrawFlamePage } from "./flame-rewards/flame-page";
import { DrawFlameHistory } from "./flame-rewards/flame-history";
import { images } from "src/shared/styles";
import { IMemberDetails } from "../account";

export function getRewardBadge(level:string) {
    switch(level.toLowerCase()){
        case "platinum":
            return images.rewardBlack;
        case "silver":
            return images.rewardSilver;
        case "gold":
            return images.rewardYellow;
        case "orange":
            return images.rewardOrange;
        default:
            return images.rewardOrange;
    }
}

export function DrawFlameRewards(props:{memberDetails:IMemberDetails, onReceiptClick?:Function}) {
    const {memberDetails, onReceiptClick}   = props;
    const defaultView = {id:"1",type:"HISTORY"};
    const [viewType, setViewType]           = useState(defaultView.type);

    function changeViewType(evt: any) { setViewType(evt === "0" ? "REWARDS" : "HISTORY") }

    const openReceipt = (receiptId:string)  => {
        if(onReceiptClick) onReceiptClick.call(this,receiptId);
    }

    return (
        <Grid container width={"100%"} className="theme" mt={2} sx={{...styles.gridContainer, ...flameStyles}}>
            <Grid xs={12} width={"100%"} className="justifyGridCenter">
                <ButtonGroup
                    defaultSelectedId={defaultView.id}
                    sx={styles.buttonGroup}
                    onSelected={changeViewType}
                    options={[
                        { title: "Flame Page", id: "0" },
                        { title: "History", id: "1" },
                    ]}
                />
            </Grid>
            {viewType=="REWARDS" && (
                <Grid container width="100%">
                    <DrawFlamePage memberDetails={memberDetails} />
                </Grid>
            )}
            {viewType=="HISTORY" && (
                <Grid container width="100%">
                    <DrawFlameHistory history={memberDetails.history || []} onClickReceipt={openReceipt} />
                </Grid>
            )}
        </Grid>
    );
}
