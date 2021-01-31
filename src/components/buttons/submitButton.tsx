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
import { width_screen, height_screen } from "../../ultis/dimensions/index";

interface ButtonFilterProps {
  onPress: () => void;
  text: string;
  btnStyle?: ViewStyle;
}

const SubmitButton = memo(
  ({ onPress, text, btnStyle = styles.submitBtn }: ButtonFilterProps) => {
    const { loading } = useSelector<any, any>((state) => state.loading);
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={["#ED3269", "#F05F3E"]}
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
            <ActivityIndicator color="#fff" animating={loading} size="small" />
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
  },
});
