import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SvgArrowBack from 'svgs/EventDetail/SvgArrowBack';
import FONTS from 'ultis/fonts';
import {useNavigation} from '@react-navigation/native';
import ThemeUtils from "ultis/themeUtils";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

interface HeaderProps {
  title: string;
  onPress: () => void;
}

const Header = memo((props: HeaderProps) => {
  const navigation = useNavigation();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={styles.touch}>
        <SvgArrowBack />
      </TouchableOpacity>
      <Text style={styles.textTitle}>{props.title}</Text>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: ThemeUtils.APPBAR_HEIGHT + getStatusBarHeight(true),
    justifyContent: 'flex-end',
  },
  touch: {
    position: 'absolute',
    left: 24,
  },
  textTitle: {
    fontFamily: FONTS.Medium,
    color: '#fff',
    fontSize: 16,
  },
});
