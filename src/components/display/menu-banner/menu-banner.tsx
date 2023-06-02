import _ from "lodash";
import React from "react";
import { getSection } from "src/store/pages/pages";
import DrawSection from "src/views/content/drawSection";

export interface IMenuBanner {
	name            : string;
	cateringBanner	: any;
	defaultBanner	: any;
	pickupBanner	: any;
	deliveryBanner	: any;
  }
  
  function doExtract(fields:any) {
	const contentTypeId = fields.sys.contentType.sys.id;
	const fieldSet = fields;
	return getSection(contentTypeId,fieldSet);
  }
  
  export const extractMenuBanner = (fields: any): IMenuBanner => {
	const retVal = {
	  name: fields.name,
	  defaultBanner: doExtract(fields.defaultBanner),
	  pickupBanner: doExtract(fields.pickupBanner),
	  deliveryBanner: doExtract(fields.deliveryBanner),
	  cateringBanner: doExtract(fields.cateringBanner),
	};
	return retVal;
  };

  
  export function DrawMenuBanner(props:{menuBanner?:IMenuBanner, orderType:string}):JSX.Element {
	const {menuBanner,orderType} = props;
	if(_.isEmpty(menuBanner)) return <></>
	let displayBanner = props.menuBanner?.defaultBanner;
	switch (orderType) {
		case "collection":
			displayBanner = props.menuBanner?.pickupBanner;
			break;
		case "delivery":
			displayBanner = props.menuBanner?.deliveryBanner;
			break;
		case "catering":
			displayBanner = props.menuBanner?.cateringBanner;
			break;
	}
	const {contentTypeId, fullWidthImageBanner}=displayBanner;
	const newBanner = {
		contentTypeId,
		fullWidthImageBanner: {
			...fullWidthImageBanner,
			topMargin:0,
			bottomMargin:0,
		}
	}

	return <DrawSection section={newBanner} />
  }