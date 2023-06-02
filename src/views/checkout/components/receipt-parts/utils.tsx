import { images } from "src/shared/styles";

export function getAddressLines (addressComponents:any):string[] {
	return [`${addressComponents?.streetNumber?.value||""} ${addressComponents?.streetName?.value || ""}`,
			`${addressComponents?.suburb?.value||""}`,
			`${addressComponents?.state?.value} ${addressComponents?.postcode?.value}`,]
}

export function getCardImage (cardType?:string) {
	switch (cardType) {
		case "visa":
			return images.visaCardIcon;
			break;
		case "mastercard":
			return images.masterCardIcon;
			break;
		case "amex":
			return images.amexCardIcon;
		default:
			return "";
	}
}

export function getOrderType (orderType?:string) {
	switch ((orderType||"").toLowerCase()) {
		case "collection":
			return "pickup";
		case "delivery":
			return "delivery";
		case "catering":
			return "catering";
		default:
			return orderType || "";
	}
}