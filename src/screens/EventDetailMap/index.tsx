import React, {memo, useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {eventLocation} from 'data/eventLocation';
import {initialLatitudeDelta} from 'screens/AllEventAroundYou';
import PinCurrentEvent from 'svgs/PinCurrentEvent';
import LocationView from 'screens/EventDetail/components/LocationView';
import {width_screen} from 'ultis/dimensions';
import MapButton from 'components/buttons/MapButton';
import { useNavigation } from '@react-navigation/native';
import ROUTES from "ultis/routes";

const EventDetailMap = memo(() => {
  const navigation = useNavigation();
  const region = useMemo(
    () => ({
      ...eventLocation[3].coordinate,
      latitudeDelta: initialLatitudeDelta,
      longitudeDelta: initialLatitudeDelta,
    }),
    [],
  );

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);
  const onDirection = useCallback(() => {
    navigation.navigate(ROUTES.Routes);
  }, []);

  return (
    <View style={styles.flex}>
      <MapView style={styles.flex} provider={PROVIDER_GOOGLE} region={region}>
        <Marker
          coordinate={eventLocation[3].coordinate}
          tracksViewChanges={false}>
          <PinCurrentEvent />
        </Marker>
      </MapView>
      <View style={styles.content}>
        <LocationView
          style={styles.locationView}
          location={'605 W 48th Street, Manhattan, 10036'}
          distance={`30.97787`,`74.78677`}
        />
        <MapButton
          onBack={onBack}
          onDirection={onDirection}
          style={styles.btnView}
        />
      </View>
    </View>
  );
});

export default EventDetailMap;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    position: 'absolute',
    bottom: 34,
    width: width_screen,
    paddingHorizontal: 24,
  },
  locationView: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 13,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 10,
  },
  btnView: {
    top: -58,
  },
});
