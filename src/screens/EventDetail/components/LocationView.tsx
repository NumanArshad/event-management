import React, {memo} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import FONTS from 'ultis/fonts';

interface LocationViewProps {
  location: string;
  distance: number;
  style?: ViewStyle;
}

const LocationView = memo((props: LocationViewProps) => {
  return (
    <View style={props.style}>
      <Text style={[styles.textLocation, {marginTop: 16}]}>Stage 48</Text>
      <Text style={[styles.textLocation, {color: '#7F8FA6'}]}>
        {props.location}
      </Text>
      <Text style={[styles.textLocation, {fontFamily: FONTS.Regular}]}>
        {props.distance} km nearby
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
