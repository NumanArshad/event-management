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
import { login, SetItem_AsynsStorage } from "redux/auth/auth.actions";
import ROUTES from "ultis/routes";
import { useNavigation } from "@react-navigation/native";

const Login = memo((navigation) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { navigate } = useNavigation();
  const [preLoader, setpreLoader] = useState(false);

  const handleLogin = () => {
    setpreLoader(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log("FORMDATA:", formData);
    login(formData)
      .then((res) => {
        console.log("Response ", res.data);
        if (res.data.status_code === 200) {
          SetItem_AsynsStorage("Token", res.data.data.token);
          SetItem_AsynsStorage("User", res.data.data.user);
          navigate(ROUTES.SelectCity);
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
  };
  return (
    <View style={styles.container}>
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
      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient
          colors={["#ED3269", "#F05F3E"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 10, marginTop: height_screen * 0.05 }}
        >
          <Text style={styles.loginBtn}>Login</Text>
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

export default Login;

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
});
