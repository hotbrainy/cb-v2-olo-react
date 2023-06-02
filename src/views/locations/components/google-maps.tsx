export interface ILatLng {
    lat         :number;
    lng         :number;
}
export interface IMapBounds {
    sw          : ILatLng;
    ne          : ILatLng;
}

export function getBounds(markers:ILatLng[]):IMapBounds {
	/* Date line +/-180 from 0
	   most westerly point is highest lng
	   most easterly point is lowest lng
	   most southerly is lowest lat
	   most northerly is highest lat
	*/
	let sw = {lat:0, lng:0};
	let ne = {lat:0, lng:0};
	
	const lats = markers.map((pnt:ILatLng)=>(pnt.lat));
	const lngs = markers.map((pnt:ILatLng)=>(pnt.lng));
	sw={lat:Math.min(...lats),lng:Math.max(...lngs)};
	ne={lat:Math.max(...lats),lng:Math.min(...lngs)};
	return {sw,ne}
}

export function getCenter(markers:ILatLng[]):ILatLng {
	const bounds = getBounds(markers);
	const midLat=((bounds.ne.lat + bounds.sw.lat) / 2);
	const midLng= ((bounds.ne.lng + bounds.sw.lng) / 2);
	return {lat:midLat, lng:midLng}
}