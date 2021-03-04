import React, {memo, useCallback, useEffect, useState} from 'react';
import {InteractionManager, ScrollView, StyleSheet, View} from 'react-native';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import UserLocation from 'svgs/UserLocation';
import EventItem from 'components/EventItem';
import {eventLocation} from 'data/eventLocation';
import PinLocation from 'svgs/PinLocation';
import ButtonFilter from 'components/buttons/ButtonFilter';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapButton from 'components/buttons/MapButton';
import ROUTES from 'ultis/routes';
import {currentLat as latitude, currentLong as longitude, getUserPosition} from "ultis/functions"

console.log(latitude, longitude)
export const userLocation = {
  latitude,
  longitude,
};
export const initialLatitudeDelta = 0.01202;
export const initialLongitudeDelta = 0.00081;
export const initialRadius = 6000;

const AllEventAroundYou = memo(() => {
  const navigation = useNavigation();
  // const initialRegion = {
  //   ...userLocation,
  //   latitudeDelta: initialLatitudeDelta,
  //   longitudeDelta: initialLongitudeDelta,
  // };
  const [color, setColor] = useState('#000');
  const [region, setRegion] = useState(null);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onFillter = useCallback(() => {
    navigation.navigate(ROUTES.FilterEvez);
  }, [navigation]);
  const onPressDirection = useCallback(() => {}, []);

  const {params} = useRoute();

  console.log("locaion is", params?.eventLocation)
 const [showMap, setShowMap] = useState(false)

  useEffect(() => {
  //  InteractionManager.runAfterInteractions(() => setShowMap(true));
  InteractionManager.runAfterInteractions(()=>setShowMap(true))
  }, [latitude, longitude]);

  useEffect(() => {
    setColor('rgba(255, 0, 0, 0.2)');
   !region && getUserPosition()?.then(res => {
      setRegion({
        latitude: res?.latitude,
        longitude: res?.longitude,
        latitudeDelta: initialLatitudeDelta,
        longitudeDelta: initialLongitudeDelta
      })
    })
  }, [region]);

if(!showMap && !region ){
  return null
}
console.log("hh",params?.eventLocation)

  return (  
    <View style={styles.mapView}>
      <View style={styles.mapContainer}>
        {region &&
         <MapView
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          
          style={styles.mapStyle}>
          <Marker coordinate={{latitude: region?.latitude, longitude: region?.longitude}} tracksViewChanges={false}>
            <UserLocation />
          </Marker>
          <Circle
            center={{latitude: region?.latitude, longitude: region?.longitude}}
            radius={initialRadius}
            strokeColor={color}
            fillColor={color}
            zIndex={2}
            strokeWidth={1}
          />
          {params?.eventLocation.map(({latitude, longitude}, index) => (
            <Marker
              coordinate={{latitude, longitude}}
              key={index}
              tracksViewChanges={true}>
              <PinLocation />
            </Marker>
          ))}
        </MapView>}
        {/* <ButtonFilter onPress={onFillter} style={styles.filterButton} /> */}
        <MapButton
          onBack={onPressBack}
          onDirection={onPressDirection}
          style={styles.mapBtnStyle}
        />
      </View>
      {/* <View style={styles.eventView}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.scroll}>
          <EventItem
            thumbnail={require('@assets/mask.png')}
            tag={['#art', '#festival']}
            reviewTimes={1.3}
            eventName={'The Gazillion Bubble Show'}
            location={'3 South Sherman Street…'}
            distance={15}
            currentAttending={19}
            //maxAttending={5000}
           // save={false}
            rate={4.5}
            marginLeft={24}
            isSmallItem={true}
          />
          <EventItem
            thumbnail={require('@assets/book.png')}
            tag={['#culture']}
            reviewTimes={1.3}
            eventName={'A Bronx Tale The Musical - Broadway'}
            location={'Tobacco Dock, London'}
            distance={15}
            currentAttending={19}
            //maxAttending={5000}
            save={false}
            rate={4.5}
            marginLeft={24}
            isSmallItem={true}
          />
          <EventItem
            thumbnail={require('@assets/EventAroundU/around_u_1.png')}
            tag={['#nightlife']}
            reviewTimes={1.3}
            eventName={'Quiet Clubbing VIP Heated Rooftop Party'}
            location={'605 W 48th Street, Manhattan...'}
            distance={10}
            currentAttending={2500}
            //maxAttending={10000}
            save={false}
            rate={4.5}
            marginLeft={24}
            isSmallItem={true}
          />
          <EventItem
            thumbnail={require('@assets/EventAroundU/around_u_2.png')}
            tag={['#fashion', '#convention']}
            reviewTimes={2.4}
            eventName={'Bottled Art" Wine Painting Nigh'}
            location={'The Grand Connaught Rooms...'}
            distance={3.5}
            currentAttending={2568}
            //maxAttending={10000}
            save={true}
            rate={4.5}
            timeCountDown={'7 Days 06 Hours 27 Mins 44 secs'}
            marginLeft={24}
            isSmallItem={true}
          />
          <EventItem
            thumbnail={require('@assets/EventAroundU/around_u_3.png')}
            tag={['#Fashion', '#Convention']}
            reviewTimes={2.4}
            eventName={'Mahogany Bridal Fair 2016'}
            location={'The Grand Connaught Rooms...'}
            distance={3.5}
            currentAttending={2568}
            //maxAttending={10000}
            save={false}
            rate={3.5}
            timeCountDown={'7 Days 06 Hours 27 Mins 44 secs'}
            marginLeft={24}
            isSmallItem={true}
          />
        </ScrollView>
      </View> */}
    </View>
  );
});
export default AllEventAroundYou;

const styles = StyleSheet.create({
  mapView: {
    width: '100%',
    flex: 1,
  },
  mapStyle: {
    width: '100%',
    flex: 1,
  },
  mapContainer: {flex: 1, alignItems: 'center'},
  filterButton: {zIndex: 6},
  buttonIcon: {
    position: 'absolute',
    bottom: 24,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    flexDirection: 'row',
    width: '100%',
  },
  eventView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 16,
  },
  scroll: {
    width: '100%',
  },
  mapBtnStyle: {
    bottom: 24,
  },
});
