import React, { memo, useEffect, useMemo, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { eventLocation } from "data/eventLocation";
import PinCurrentEvent from "svgs/PinCurrentEvent";
import { InteractionManager, StyleSheet, Alert } from "react-native";
import { width_screen } from "ultis/dimensions";
import { initialLatitudeDelta } from "screens/AllEventAroundYou";

interface mapLocationProps {
  eventLocation: String;
}

const MapLocation = memo((props: mapLocationProps) => {
  const [showMap, setShowMap] = useState(false);

  const [strLatitude, strLongitude] = props?.eventLocation?.split(",");
  const [latitude, longitude] = [+strLatitude, +strLongitude];

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => setShowMap(true));
  }, [latitude, longitude]);
  const region = {
    latitude,
    longitude,
    latitudeDelta: latitude,
    longitudeDelta: longitude,
  };

  if (!showMap) {
    return null;
  }

  return (
    <MapView
      style={styles.mapContainer}
      provider={PROVIDER_GOOGLE}
      region={region} //highligh lat/long lpoint region
    >
      <Marker coordinate={{ latitude, longitude }} tracksViewChanges={false}>
        <PinCurrentEvent />
      </Marker>
    </MapView>
  );
});

export default MapLocation;
const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 16,
    width: width_screen,
    height: 224 * (width_screen / 375),
    backgroundColor: "green",
  },
});
