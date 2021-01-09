import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import FONTS from 'ultis/fonts';

interface Props {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const ButtonLinear = memo((props: Props) => {
  return (
    <TouchableOpacity
      style={[props.style, {overflow: 'hidden'}]}
      onPress={props.onPress}
      activeOpacity={0.75}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.linear}
        colors={['#ED3269', '#F05F3E']}>
        <Text style={styles.txtCode}>{props.title || ''}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
});

export default ButtonLinear;

const styles = StyleSheet.create({
  txtCode: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#fff',
  },
  linear: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
