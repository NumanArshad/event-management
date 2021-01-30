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
import Color from "../../ultis/color/index";
import { LinearGradient } from "expo-linear-gradient";
import { forgotPassword } from "redux/auth/auth.actions";
import ROUTES from "ultis/routes";
import { useNavigation } from "@react-navigation/native";
import Text_Input from "ultis/component/Text_Input";

const ForgotPassword = memo((navigation) => {
  const [email, setemail] = useState("");
  const { navigate } = useNavigation();
  const [preLoader, setpreLoader] = useState(false);

  const ValidateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    Alert.alert("", "You have entered an invalid email address!");
    return false;
  };

  const check = () => {
    Alert.alert("", email);
  };
  const handleForgotPassword = () => {
    if (ValidateEmail() && email != "") {
      setpreLoader(true);
      const formData = new FormData();
      formData.append("email", email);
      console.log("FORMDATA:", formData);
      forgotPassword(formData)
        .then((res) => {
          console.log("Response ", res.data);
          if (res.data.status_code === 200) {
            navigate(ROUTES.Login);
            setpreLoader(false);
          }
          setpreLoader(false);
        })
        .catch((err) => {
          console.log("ERror :", err.response.data.errors);
          Alert.alert("", JSON.stringify(err.response.data.errors));
          setpreLoader(false);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.forgotText}>
          No Worries! You can easily recover your account with the e-mail
          address you have on file with us. Please enter your email below and we
          will respond within 1-2 minutes.
        </Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Email..."
        onChangeText={(data) => setemail(data)}
      />

      <View style={styles.viewCreate}>
        <Text style={{ color: "#ED3269", fontSize: 12 }}>
          Remember Password?{" "}
          <TouchableOpacity onPress={() => navigate(ROUTES.Login)}>
            <Text style={{ textDecorationLine: "underline", fontSize: 12 }}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <LinearGradient
          colors={["#ED3269", "#F05F3E"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 10, marginTop: height_screen * 0.03 }}
        >
          <Text style={styles.loginBtn}>Submit</Text>
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
            <ActivityIndicator
              color="#fff"
              animating={preLoader}
              size="small"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
});

export default ForgotPassword;

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
  loginBtn: {
    height: height_screen * 0.055,
    width: width_screen * 0.3,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginTop: height_screen * 0.01,
    textAlign: "center",
    paddingTop: height_screen * 0.012,
    color: "#fff",
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
