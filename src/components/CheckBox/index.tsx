import React, {memo} from 'react';
import {TouchableOpacity, StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  style?: ViewStyle;
  borderColor: string;
  checkedColor: string;
  onPress: () => void;
  isCheck: boolean;
  styleOfCircle?: ViewStyle;
}

const CheckBox = memo((props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.style, {borderColor: props.borderColor}]}
      onPress={props.onPress}>
      {props.isCheck ? (
        <View
          style={[
            styles.circle,
            props.styleOfCircle,
            {backgroundColor: props.checkedColor},
          ]}
        />
      ) : null}
    </TouchableOpacity>
  );
});
export default CheckBox;
const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
    borderRadius: 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 2,
  },
});
