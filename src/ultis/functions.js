import dayjs from "dayjs";
import { baseImageUrl, noFoundImg } from "./constants";

export let [currentLat, currentLong] = [null, null];

export const getUserPosition = () => {
  return new Promise((resolve, reject)=>{
    navigator.geolocation.getCurrentPosition(
      //@ts-ignore
      (position) => {
        const location = JSON.stringify(position);
        console.log("my location is", location);
        const {
          coords: { latitude, longitude },
        } = position;
        [currentLat, currentLong] = [latitude, longitude];
       latitude && resolve({latitude, longitude})
        // {latitude, longitude}
      },
      (error) => {
        console.log("in user location",error.message);
        return reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  })
   
};

export const getEventTimeDown = (dateTime) => {
  const eventDateTime = dayjs(dateTime);
  
  const current = dayjs().format("MM/DD/YYYY HH:mm");
  const mins = eventDateTime.diff(current, "minutes", true);
  const totalHours = parseInt(mins / 60);
  const totalMins = dayjs().minute(mins).$m;
  const days = parseInt(totalHours / 24);
  const remaingHours = totalHours % 24;

  return {
    days: days === -0 ? 0 : days,
    hours: remaingHours,
    minutes: remaingHours < 0 ? 60 - totalMins : totalMins,
    overAllMinutes: mins
  };
};

export const compareDateTime = (dateTime) => {
  const eventDateTime = dayjs(dateTime);

  const current = dayjs().format("MM/DD/YYYY HH:mm");
  return {
    isAfter: eventDateTime.isAfter(current),
    isSame: eventDateTime.isSame(current),
    isBefore: eventDateTime.isBefore(current),
  };
};

export const isEventInProgress = (eventDateTime, duration) => {
  const [strHours, strMins] = duration?.split(":");
  const [durationHours, durationMins] = [+strHours, +strMins];

  const { isSame, isBefore, isAfter } = compareDateTime(eventDateTime);

  const { overAllMinutes } = getEventTimeDown(eventDateTime);

  const diffMinutes =  overAllMinutes * -1;
  const durationMinutes = (durationHours * 60) + durationMins;

  console.log("det is", diffMinutes, durationMinutes,isBefore, isAfter, getEventTimeDown(eventDateTime))

  const progressFlag = isBefore ?

      diffMinutes <= durationMinutes :
      isSame

  return progressFlag
  
};

export const formatDateTime = (eventDate, eventTime) => {
  const [time, ...rest] = eventTime?.split(" ");
  return `${eventDate} ${time}`;
};

export const splitLatLongStr = (latLong) => {
  const [strLat, strLong] = latLong?.split(",");
  const [latitude, longitude] = [+strLat, +strLong];
  return { latitude, longitude };
};

export const getDistanceByLatLong = (
  lat1,
  lon1,
  lat2 = currentLat,
  lon2 = currentLong,
  unit = "K"
) => {
  if (!lat2 || !lon2) return;
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    //console.log("lt is", lat2);
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return Math.ceil(dist);
  }
};

export const getImage = image => {
  const imagePath = image?.includes("firebasestorage") ? `` : baseImageUrl;
  return (!image || image.includes('default')) ? noFoundImg : `${imagePath}${image}`
}