import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import IconFilter from 'svgs/IconFilter';
import FONTS from 'ultis/fonts';

interface ButtonFilterProps {
  onPress: () => void;
  style?: ViewStyle;
}

const ButtonFilter = memo((props: ButtonFilterProps) => {
  return (
    <TouchableOpacity
      style={[styles.filterButton, props.style]}
      activeOpacity={0.7}
      onPress={props.onPress}>
      <Text style={styles.textButton}>Filter</Text>
      <IconFilter />
    </TouchableOpacity>
  );
});

export default ButtonFilter;

const styles = StyleSheet.create({
  filterButton: {
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 13,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 10,
  },
  textButton: {
    marginRight: 8,
    fontSize: 14,
    fontFamily: FONTS.Medium,
  },
});
