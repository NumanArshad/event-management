import React, { memo, useCallback } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import SvgArrowBack from "svgs/EventDetail/SvgArrowBack";
import ThemeUtils from "ultis/themeUtils";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Color from "ultis/color";
import LinearGradient from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import SvgNotificationIcon from "svgs/Proflie/SvgNotificationIcon";
import SvgSettingIcon from "svgs/Proflie/SvgSettingsIcon";
import ROUTES from "ultis/routes";
import { Animated } from "react-native-reanimated";
const LinearAnimated = Animated.createAnimatedComponent(LinearGradient);

interface Props {
  scrollY: any;
  userName: string;
}

const Header = memo((props: Props) => {
  const opacity = props.scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
  });
  const headerTitleOpacity = props.scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const navigation = useNavigation();
  const onNotification = useCallback(() => {
    navigation.navigate(ROUTES.Notification);
  }, [navigation]);
  const onSettings = useCallback(() => {
    navigation.navigate(ROUTES.Settings);
  }, [navigation]);
  return (
    <Animated.View style={styles.headerStyle}>
      <View style={styles.headerLeftIcon} />
      <Animated.Text
        style={[
          styles.headerTitle,
          {
            opacity: headerTitleOpacity,
          },
        ]}
      >
        {props.userName}
      </Animated.Text>
      <View style={styles.headerLeftIcon}>
        <TouchableOpacity
          onPress={onNotification}
          style={styles.headerRightIcon}
        >
          <SvgNotificationIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSettings} style={styles.headerRightIcon}>
          <SvgSettingIcon />
        </TouchableOpacity>
      </View>
      {/*<LinearAnimated*/}
      {/*    // colors={[color1, color2]}*/}
      {/*    colors={['#ED3269', '#F05F3E']}*/}
      {/*    start={{x: 0, y: 1}}*/}
      {/*    end={{x: 1, y: 1}}*/}
      {/*    style={[*/}
      {/*        {*/}
      {/*            opacity: opacity,*/}
      {/*            flex: 1,*/}
      {/*            ...StyleSheet.absoluteFillObject,*/}
      {/*            zIndex: 1,*/}
      {/*        },*/}
      {/*    ]}*/}
      {/*/>*/}
    </Animated.View>
  );
});
export default Header;
const styles = StyleSheet.create({
  headerLeftIcon: {
    height: "100%",
    paddingLeft: ThemeUtils.relativeWidth(4),
    zIndex: 2,
    width: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerRightIcon: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: ThemeUtils.relativeWidth(4),
    zIndex: 2,
  },
  headerStyle: {
    paddingTop: getStatusBarHeight(true),
    height: ThemeUtils.APPBAR_HEIGHT + getStatusBarHeight(true),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
    position: "absolute",
  },
  headerTitle: {
    textAlign: "center",
    justifyContent: "center",
    color: Color.HEADER_TEXT_COLOR,
    fontSize: ThemeUtils.fontNormal,
    flex: 1,
    zIndex: 2,
  },
});
