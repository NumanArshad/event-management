import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import EmptyStar from 'svgs/EmptyStar';
import HalfStarRate from 'svgs/HalfStarRate';
import StarRate from 'svgs/StarRate';

interface StarIconProps {
  fillFull: boolean;
  fillHalf: boolean;
}
const StarIcon = memo((props: StarIconProps) => {
  return (
    <View style={styles.star}>
      {props.fillFull ? (
        <StarRate />
      ) : props.fillHalf ? (
        <HalfStarRate />
      ) : (
        <EmptyStar />
      )}
    </View>
  );
});

export default StarIcon;

const styles = StyleSheet.create({
  star: {marginLeft: 3},
});
