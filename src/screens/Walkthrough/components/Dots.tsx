import React, {memo} from 'react';
import {height_screen, width_screen} from 'ultis/dimensions';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Animated, StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  scrollX: Animated.Value;
  style?: ViewStyle;
}

const Dots = memo(({scrollX, ...props}: Props) => {
  const opacity1 = scrollX.interpolate({
    inputRange: [0, width_screen, width_screen * 2],
    outputRange: [1, 0.4, 0.4],
    extrapolate: 'clamp',
  });
  const opacity2 = scrollX.interpolate({
    inputRange: [0, width_screen, width_screen * 2],
    outputRange: [0.4, 1, 0.4],
    extrapolate: 'clamp',
  });
  const opacity3 = scrollX.interpolate({
    inputRange: [0, width_screen, width_screen * 2],
    outputRange: [0.4, 0.4, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={[styles.container, props.style]}>
      <Animated.View style={[styles.dot, {opacity: opacity1}]} />
      <Animated.View style={[styles.dotCenter, {opacity: opacity2}]} />
      <Animated.View style={[styles.dot, {opacity: opacity3}]} />
    </View>
  );
});

export default Dots;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: height_screen * 0.2 + getBottomSpace(),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgb(255,255,255)',
  },
  dotCenter: {
    marginHorizontal: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgb(255,255,255)',
  },
});
