import React, {memo, useCallback} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import SvgArrowBack from 'svgs/EventDetail/SvgArrowBack';
import ThemeUtils from 'ultis/themeUtils';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Color from 'ultis/color';
import LinearGradient from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const LinearAnimated = Animated.createAnimatedComponent(LinearGradient);

interface Props {
  scrollY: any;
  title?: string;
  svg: any;
  svgGoBack?: boolean;
  onPress: () => void;
}

const Header = memo((props: Props) => {
  const opacity = props.scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
  });
  const headerTitleOpacity = props.scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const navigation = useNavigation();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <Animated.View style={styles.headerStyle}>
      {props.svgGoBack ? (
        <TouchableOpacity onPress={onBack} style={styles.headerLeftIcon}>
          <SvgArrowBack />
        </TouchableOpacity>
      ) : null}
      <Animated.Text
        style={[
          styles.headerTitle,
          {
            opacity: headerTitleOpacity,
          },
        ]}>
        {props.title}
      </Animated.Text>
      <TouchableOpacity onPress={props.onPress} style={styles.headerRightIcon}>
        {props.svg}
      </TouchableOpacity>
      {/*<LinearAnimated*/}
      {/*  // colors={[color1, color2]}*/}
      {/*  colors={['#ED3269', '#F05F3E']}*/}
      {/*  start={{x: 0, y: 1}}*/}
      {/*  end={{x: 1, y: 1}}*/}
      {/*  style={[*/}
      {/*    {*/}
      {/*      opacity: opacity,*/}
      {/*      flex: 1,*/}
      {/*      ...StyleSheet.absoluteFillObject,*/}
      {/*      zIndex: 1,*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
    </Animated.View>
  );
});
export default Header;
const styles = StyleSheet.create({
  headerLeftIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: ThemeUtils.relativeWidth(4),
    zIndex: 2,
  },
  headerRightIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: ThemeUtils.relativeWidth(4),
    zIndex: 2,
  },
  headerStyle: {
    paddingTop: getStatusBarHeight(true),
    height: ThemeUtils.APPBAR_HEIGHT + getStatusBarHeight(true),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    position: 'absolute',
  },
  headerTitle: {
    textAlign: 'center',
    justifyContent: 'center',
    color: Color.HEADER_TEXT_COLOR,
    fontSize: ThemeUtils.fontNormal,
    flex: 1,
    zIndex: 2,
  },
});
