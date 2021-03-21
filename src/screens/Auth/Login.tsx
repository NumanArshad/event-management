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
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { width_screen, height_screen } from "../../ultis/dimensions/index";
import { login } from "redux/auth/auth.actions";
import ROUTES from "ultis/routes";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import SubmitButton from "components/buttons/submitButton";
import Color from "ultis/color";
const Login = memo(() => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const { authloading } = useSelector<any, any>((state) => state.loading);
  const { all_errors } = useSelector<any, any>((state) => state.errors);

  const ValidateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    Alert.alert("", "You have entered an invalid email address!");
    return false;
  };

  const handleLogin = () => {
    if (email != "" && password != "") {
      if (ValidateEmail()) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        ////console.log("FORMDATA:", formData);
        dispatch(login(formData));
      }
    } else {
      Alert.alert("", "Kindly Fill All The Inputs.");
    }
  };

  if (authloading) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.container}>
        <Image
          // source={{
          //   uri:
          //     "https://i.pinimg.com/originals/f6/db/9b/f6db9b785d37c154c2be26b7c32604b6.jpg",
          // }}
          source={require("assets/iuvo.png")}
          style={styles.imageProfile}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email..."
          onChangeText={(data) => setemail(data)}
        />
        {all_errors?.email && (
          <Text style={{ color: Color.GRAD_COLOR_1 }}>{all_errors?.email}</Text>
        )}
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Password..."
          textContentType="password"
          onChangeText={(data) => setpassword(data)}
        />
        {all_errors && typeof all_errors === "string" ? (
          <Text style={{ color: Color.GRAD_COLOR_1 }}>{all_errors}</Text>
        ) : null}

        {/* <Text_Input
        secureText={false}
        placeholder="Pakistan..."
        style={[styles.textInput, { backgroundColor: "red" }]}
        setdata={(data) => setemail(data)}
        placeholderColor="#a4a4a4"
      /> */}
        <View style={styles.viewForgotPass}>
          <TouchableOpacity onPress={() => navigate(ROUTES.ForgotPassword)}>
            <Text
              style={{
                color: Color.GRAD_COLOR_3,
                fontSize: 12,
                textAlign: "right",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewCreate}>
          <Text style={{ color: Color.GRAD_COLOR_3 }}>
            Don't have an Account?{" "}
            <TouchableOpacity onPress={() => navigate(ROUTES.Register)}>
              <Text style={{ textDecorationLine: "underline" }}>Create</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <SubmitButton text="Login" onPress={handleLogin} />
      </View>
    );
  }
});

export default Login;

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
    borderColor: Color.GRAD_COLOR_3,
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
  imageProfile: {
    height: height_screen * 0.23,
    width: width_screen * 0.50,
    // backgroundColor: "#a4a4a4",
    resizeMode: "contain",
    borderRadius: 100,
  },
});
