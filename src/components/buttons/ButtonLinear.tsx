import React, { memo } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FONTS from "ultis/fonts";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Color from "ultis/color";
import { useSelector } from "react-redux";
import { height_screen } from "ultis/dimensions";

interface Props {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  isDisabled?: Boolean;
}

const ButtonLinear = memo((props: Props) => {

const { buttonLoading } = useSelector<any, any>((state) => state?.loading);
  return (
    <TouchableOpacity
      style={[props.style, { overflow: "hidden" }]}
      onPress={props.onPress}
      activeOpacity={0.75}
      disabled={props.isDisabled || buttonLoading}
      
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.linear}
        colors={[Color.GRAD_COLOR_3, Color.GRAD_COLOR_3]}
      >
        <Text style={styles.txtCode}>{props.title}</Text>
        <View
            style={{
              position: "absolute",
              left: height_screen * 0.09,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color="#fff" animating={buttonLoading} size="small" />
          </View>
      </LinearGradient>
    </TouchableOpacity>
  );
});

export default ButtonLinear;

const styles = StyleSheet.create({
  txtCode: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: "#fff",
  },
  linear: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
