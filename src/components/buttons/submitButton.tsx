import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSelector } from "react-redux";
import Color from "ultis/color";
import { width_screen, height_screen } from "../../ultis/dimensions/index";

interface ButtonFilterProps {
  onPress: () => void;
  text: string;
  btnStyle?: ViewStyle;
  isDisabled?: Boolean;
}

const SubmitButton = memo(
  ({
    onPress,
    text,
    btnStyle = styles.submitBtn,
    isDisabled = false,
  }: ButtonFilterProps) => {
    const { buttonLoading } = useSelector<any, any>((state) => state.loading);
 
    return (
      <TouchableOpacity onPress={onPress} disabled={buttonLoading || isDisabled}>
        <LinearGradient
          colors={[Color.GRAD_COLOR_3, Color.GRAD_COLOR_3]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 10, marginTop: height_screen * 0.03 }}
        >
          <Text style={btnStyle}>{text}</Text>
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
  }
);

export default SubmitButton;

const styles = StyleSheet.create({
  submitBtn: {
    height: height_screen * 0.055,
    width: width_screen * 0.3,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginTop: height_screen * 0.01,
    textAlign: "center",
    paddingTop: height_screen * 0.012,
    color: "#fff",
    alignSelf: "center",
  },
});
