import React from "react";
import { TouchableOpacity } from "react-native";
import SvgChatOption from "svgs/PeopleProfile/SvgChatOption";

const headerRight = () => (
  <TouchableOpacity>
    <SvgChatOption style={{ right: 24 }} />
  </TouchableOpacity>
);

export default headerRight;
