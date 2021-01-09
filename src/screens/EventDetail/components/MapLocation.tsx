import React, {memo, useEffect, useMemo, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {eventLocation} from 'data/eventLocation';
import PinCurrentEvent from 'svgs/PinCurrentEvent';
import {InteractionManager, StyleSheet} from 'react-native';
import {width_screen} from 'ultis/dimensions';
import {initialLatitudeDelta} from 'screens/AllEventAroundYou';

const MapLocation = memo(() => {
  const [showMap, setShowMap] = useState(false);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => setShowMap(true));
  }, []);
  const region = useMemo(
    () => ({
      ...eventLocation[1].coordinate,
      latitudeDelta: initialLatitudeDelta,
      longitudeDelta: initialLatitudeDelta,
    }),
    [],
  );
  if (!showMap) {
    return null;
  }
  return (
    <MapView
      style={styles.mapContainer}
      provider={PROVIDER_GOOGLE}
      region={region}>
      <Marker
        coordinate={eventLocation[1].coordinate}
        tracksViewChanges={false}>
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
    backgroundColor: 'green',
  },
});
