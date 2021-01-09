import React, {memo, useCallback} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface PaymentMethodProps {
  styleImage: ImageStyle;
  source: any;
  onChoose: (index: number) => void;
  index: number;
  isChoose: number;
}

const PaymentMethod = memo((props: PaymentMethodProps) => {
  const borderColor = props.isChoose === props.index ? '#ED3269' : '#fff';

  const onChoose = useCallback(() => {
    props.onChoose(props.index);
  }, []);

  return (
    <TouchableOpacity
      onPress={onChoose}
      style={[styles.touch, {borderColor: borderColor}]}>
      <Image source={props.source} style={props.styleImage} />
    </TouchableOpacity>
  );
});

export default PaymentMethod;

const styles = StyleSheet.create({
  touch: {
    backgroundColor: '#fff',
    width: 98,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,

    elevation: 10,
  },
});
