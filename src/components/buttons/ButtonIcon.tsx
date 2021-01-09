import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

interface ButtonIconProps {
  children?: any;
  style?: ViewStyle;
  onPress: () => void;
}

const ButtonIcon = memo((props: ButtonIconProps) => {
  return (
    <TouchableOpacity
      style={[props.style, styles.button]}
      onPress={props.onPress}
      activeOpacity={0.8}
    >
      {props.children}
    </TouchableOpacity>
  );
});

export default ButtonIcon;

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42 / 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 10,
  },
});
