import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Color from "ultis/color";

const headerBackground = () => (
  <LinearGradient
    colors={[Color.GRAD_COLOR_3, Color.GRAD_COLOR_3]}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 1 }}
    style={{ flex: 1 }}
  />
);

export default headerBackground;
