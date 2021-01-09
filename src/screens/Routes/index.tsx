import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {eventLocation} from 'data/eventLocation';
import {initialLatitudeDelta, userLocation} from 'screens/AllEventAroundYou';
import FONTS from 'ultis/fonts';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Traffic from 'screens/Routes/components/Traffic';
import {width_screen} from 'ultis/dimensions';
import MapViewDirections from 'react-native-maps-directions';
import SvgPin from 'svgs/Routes/SvgPin';

export const API_KEY = 'AIzaSyCbDp50TTwSW3OWWcqUU6h0KGgEwP9hUiE';

const Routes = memo(() => {
  const [showDirection, setShowDirection] = useState(false);

  const region = useMemo(
    () => ({
      ...eventLocation[3].coordinate,
      latitudeDelta: initialLatitudeDelta,
      longitudeDelta: initialLatitudeDelta,
    }),
    [],
  );

  const onMapDirection = useCallback(() => {
    setShowDirection(true);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}>
        <Marker
          coordinate={eventLocation[3].coordinate}
          tracksViewChanges={false}>
          <SvgPin />
        </Marker>
        {showDirection ? (
          <Marker coordinate={userLocation} tracksViewChanges={false}>
            <SvgPin />
          </Marker>
        ) : null}
        {showDirection ? (
          <MapViewDirections
            apikey={API_KEY}
            origin={userLocation}
            destination={eventLocation[3].coordinate}
            strokeWidth={4}
            strokeColor={'#ED3269'}
          />
        ) : null}
      </MapView>
      <View>
        <View style={styles.schedule}>
          <Text style={styles.textLocation}>
            Brooklyn <Text style={styles.textOther}>to</Text> 605 W 48th Street,
            Manhattan
          </Text>
          <Text style={styles.textOther}>Showing top 5 travel options</Text>
        </View>
        <Traffic
          nameTraffic={'Subway'}
          estimateTime={'44 mins'}
          price={[3]}
          trafficType={0}
          onPress={onMapDirection}
        />
        <Traffic
          nameTraffic={'Line 2 subway'}
          estimateTime={'57 mins'}
          price={[3]}
          trafficType={0}
          onPress={onMapDirection}
        />
        <Traffic
          nameTraffic={'Taxi'}
          estimateTime={'17 mins'}
          price={[50, 65]}
          trafficType={1}
          onPress={onMapDirection}
        />
        <Traffic
          nameTraffic={'Drive'}
          estimateTime={'17 mins'}
          price={[1, 2]}
          trafficType={2}
          onPress={onMapDirection}
        />
        <Traffic
          nameTraffic={'Uber'}
          estimateTime={'17 mins'}
          price={[23, 35]}
          trafficType={3}
          endOfList={true}
          onPress={onMapDirection}
        />
      </View>
    </View>
  );
});

export default Routes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: getBottomSpace(),
    backgroundColor: '#fff',
  },
  mapView: {
    width: width_screen,
    height: (160 * width_screen) / 375,
  },
  textOther: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    lineHeight: 17,
    color: '#353B48',
  },
  textLocation: {
    fontSize: 14,
    fontFamily: FONTS.Medium,
    lineHeight: 17,
    color: '#ED3269',
    marginBottom: 9,
  },
  schedule: {
    paddingHorizontal: 24,
    paddingVertical: 17,
    color: '#F2F8FA',
  },
});
