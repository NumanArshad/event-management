import React from "react";
import { Text } from "react-native";
import Color from "ultis/color";

const NoContentFound = ({ text }: { text: string }) => (
  <Text style={{ textAlign: "center", color: Color.GRAD_COLOR_3 }}>{text}</Text>
);

export default NoContentFound;
