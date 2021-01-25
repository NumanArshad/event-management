import UserItem from "components/UserItem";
import React, { memo, useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { width_screen, height_screen } from "../dimensions/index";
import Color from "../color/index";
import { LinearGradient } from "expo-linear-gradient";
import { login, SetItem_AsynsStorage } from "redux/auth/auth.actions";
import ROUTES from "ultis/routes";
import { useNavigation } from "@react-navigation/native";

const Text_Input = memo(
  ({ style, placeholder, placeholderColor, secureText, setdata }) => {
    return (
      <TextInput
        style={style}
        placeholder={placeholder}
        onChangeText={(data) => setdata(data)}
        placeholderTextColor={placeholderColor}
        secureTextEntry={secureText}
      />
    );
  }
);

export default Text_Input;

const styles = StyleSheet.create({});
