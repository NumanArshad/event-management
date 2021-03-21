import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function WatchLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        {
          enableHighAccuracy: false,
          distanceInterval: 2000,
          timeInterval: 1000,
        },
        (newLoc) => {
        //  if (newLoc.timestamp) {
            console.log("newLoc ", newLoc);
            setLocation(JSON.stringify(newLoc))
            //(newLoc)
            //   counter++
        //  } else {
          //  console.log("ignored newLoc");
         // }
        }
      );
    })();
  });

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

  return (
    <View >
      <Text >{location}</Text>
    </View>
  );
}