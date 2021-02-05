import React, {memo} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import FONTS from 'ultis/fonts';
import { getDistanceByLatLong, splitLatLongStr } from 'ultis/functions';

interface LocationViewProps {
  location: string;
  distance: string;
  style?: ViewStyle;
}

const LocationView = memo((props: LocationViewProps) => {

const {latitude, longitude} = splitLatLongStr(props.distance) || {}

  return (
    <View style={props.style}>
      <Text style={[styles.textLocation, {marginTop: 16}]}>Stage 48</Text>
      <Text style={[styles.textLocation, {color: '#7F8FA6'}]}>
        {props.location}
      </Text>
      <Text style={[styles.textLocation, {fontFamily: FONTS.Regular}]}>
        {getDistanceByLatLong(latitude, longitude)} km nearby
      </Text>
    </View>
  );
});

export default LocationView;

const styles = StyleSheet.create({
  textLocation: {
    fontSize: 16,
    fontFamily: FONTS.Medium,
    color: '#353B48',
    lineHeight: 20,
    marginTop: 8,
  },
});
