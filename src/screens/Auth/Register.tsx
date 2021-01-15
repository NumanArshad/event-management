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
import Color from "../../ultis/color/index";
import { LinearGradient } from "expo-linear-gradient";
import { login, register, SetItem_AsynsStorage } from "redux/auth/auth.actions";
import ROUTES from "ultis/routes";
import { useNavigation } from "@react-navigation/native";
import Text_Input from "ultis/component/Text_Input";
import Logo from "../../assets/logo.jpg";

const Register = memo((navigation) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [cPassword, setcPassword] = useState("");
  const { navigate } = useNavigation();
  const [preLoader, setpreLoader] = useState(false);
  const [userType, setuserType] = useState("citizen");
  const check = () => {
    Alert.alert("", email);
  };

  const ValidateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    Alert.alert("", "You have entered an invalid email address!");
    return false;
  };

  const validatePassword = () => {
    if (password === cPassword) {
      return true;
    }
    Alert.alert("", "Password and Confirm Password doesn't match!");
    return false;
  };

  const handleRegister = () => {
    if (
      ValidateEmail() &&
      validatePassword() &&
      email != "" &&
      password != ""
    ) {
      setpreLoader(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("user_type", "citizen");
      formData.append("name", name);
      formData.append("password_confirmation", cPassword);
      console.log("FORMDATA:", formData);
      register(formData)
        .then((res) => {
          console.log("Response ", res.data);
          if (res.data.status_code === 200) {
            // SetItem_AsynsStorage("Token", res.data.data.token);
            // SetItem_AsynsStorage("User", res.data.data.user);
            navigate(ROUTES.Login);
            setpreLoader(false);
          }
          // console.log("RESPONSE LOGIN TOKEN:", res.data.data.token);
          // console.log("RESPONSE LOGIN USER:", res.data.data.user);
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
      <Image
        // source={{
        //   uri:
        //     "https://i.pinimg.com/originals/f6/db/9b/f6db9b785d37c154c2be26b7c32604b6.jpg",
        // }}
        source={Logo}
        style={styles.imageProfile}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Name..."
        onChangeText={(data) => setname(data)}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Email..."
        onChangeText={(data) => setemail(data)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Password..."
        textContentType="password"
        onChangeText={(data) => setpassword(data)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Confirm Password..."
        textContentType="password"
        onChangeText={(data) => setcPassword(data)}
      />

      {/* <View style={styles.viewForgotPass}>
        <TouchableOpacity>
          <Text style={{ color: "#ED3269", fontSize: 12, textAlign: "right" }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View> */}

      <View>
        <Text
          style={{
            color: "#ED3269",
            marginTop: height_screen * 0.01,
            textAlign: "center",
            marginBottom: height_screen * 0.01,
          }}
        >
          What best describe you?
        </Text>
        <View style={styles.viewToggle}>
          <Text
            onPress={() => setuserType("citizen")}
            style={[
              styles.toggleButton,
              {
                color: userType === "citizen" ? "#fff" : "#a4a4a4",
                backgroundColor: userType === "citizen" ? "#ED3269" : "#fff",
              },
            ]}
          >
            Citizen
          </Text>
          <Text
            onPress={() => setuserType("customer")}
            style={[
              styles.toggleButton,
              {
                color: userType === "customer" ? "#fff" : "#a4a4a4",
                backgroundColor: userType === "customer" ? "#ED3269" : "#fff",
              },
            ]}
          >
            Customer
          </Text>
        </View>
      </View>
      {/* <Text_Input
        secureText={false}
        placeholder="Pakistan..."
        style={[styles.textInput, { backgroundColor: "red" }]}
        setdata={(data) => setemail(data)}
        placeholderColor="#a4a4a4"
      /> */}

      <View style={styles.viewCreate}>
        <Text style={{ color: "#ED3269" }}>
          Already have an Account?{" "}
          <TouchableOpacity onPress={() => navigate(ROUTES.Login)}>
            <Text style={{ textDecorationLine: "underline", fontSize: 12 }}>
              Login
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <TouchableOpacity onPress={handleRegister}>
        <LinearGradient
          colors={["#ED3269", "#F05F3E"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 10, marginTop: height_screen * 0.03 }}
        >
          <Text style={styles.loginBtn}>Sign Up</Text>
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

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  toggleButton: {
    height: height_screen * 0.05,
    // backgroundColor: "",
    borderRadius: 10,
    width: width_screen * 0.25,
    textAlign: "center",
    paddingTop: height_screen * 0.01,
    color: "#a4a4a4",
    margin: 1,
    borderWidth: 1,
    borderColor: "#F05F3E",
  },
  viewToggle: {
    width: width_screen * 0.7,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  imageProfile: {
    height: height_screen * 0.2,
    width: width_screen * 0.3,
    // backgroundColor: "#a4a4a4",
    resizeMode: "contain",
    borderRadius: 100,
  },
});
