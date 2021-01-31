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
import { width_screen, height_screen } from "../../ultis/dimensions/index";
import { forgotPassword } from "redux/auth/auth.actions";
import ROUTES from "ultis/routes";
import { useNavigation } from "@react-navigation/native";
import Text_Input from "ultis/component/Text_Input";
import SubmitButton from "components/buttons/submitButton";

const ChangePassword = memo((navigation) => {
  const { navigate } = useNavigation();
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const validatePassword = () => {
    if (newPassword === confirmPassword) {
      return true;
    }
    Alert.alert("", "New Password and Confirm Password doesn't match!");
    return false;
  };
  const handleForgotPassword = () => {
    if (currentPassword != "" && newPassword != "" && confirmPassword != "") {
      if (validatePassword()) {
        const formData = new FormData();
        formData.append("current_password", currentPassword);
        formData.append("password", newPassword);

        formData.append("password_confirmation", confirmPassword);

        //   console.log("FORMDATA:", formData);
        forgotPassword(formData)
          .then((res) => {
            console.log("Response ", res.data);
            if (res.data.status_code === 200) {
              Alert.alert("", res.data.message);
              navigate(ROUTES.Login);
            }
          })
          .catch((err) => {
            console.log("ERror :", err.response.data.errors);
            Alert.alert("", JSON.stringify(err.response.data.errors));
          });
      }
    } else {
      Alert.alert("", "Kindly Fill All The Inputs.");
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.forgotText}>
          You can Change your Password Any Time.Thank You!
        </Text>
      </View>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Current Password..."
        textContentType="password"
        onChangeText={(data) => setcurrentPassword(data)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="New Password..."
        textContentType="password"
        onChangeText={(data) => setnewPassword(data)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Confirm Password..."
        textContentType="password"
        onChangeText={(data) => setconfirmPassword(data)}
      />
      <View style={styles.viewCreate}>
        <Text style={{ color: "#ED3269", fontSize: 12 }}>
          Remember Password?{" "}
          <TouchableOpacity onPress={() => navigate(ROUTES.Profile)}>
            <Text style={{ textDecorationLine: "underline", fontSize: 12 }}>
              Back to Profile
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <SubmitButton text="Submit" onPress={handleForgotPassword} />
    </View>
  );
});

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
  },
  textInput: {
    height: height_screen * 0.07,
    width: width_screen * 0.8,
    borderWidth: 0.8,
    borderColor: "#F05F3E",
    borderRadius: 10,
    marginTop: height_screen * 0.01,
    paddingLeft: height_screen * 0.02,
  },
  viewForgotPass: {
    flexDirection: "row",
    width: width_screen,
    justifyContent: "flex-end",
    paddingHorizontal: width_screen * 0.11,
    marginVertical: height_screen * 0.005,
  },
  viewCreate: {
    flexDirection: "row",
    width: width_screen,
    justifyContent: "center",
    marginTop: height_screen * 0.015,
  },
  forgotText: {
    color: "#a4a4a4",
    width: width_screen * 0.8,
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontSize: 10,
    marginBottom: height_screen * 0.02,
  },
});
