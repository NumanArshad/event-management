import UserItem from "components/UserItem";
import React, { memo, useCallback, useEffect, useState } from "react";
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
import { getProfile, updateProfile } from "redux/auth/auth.actions";
import ROUTES from "ultis/routes";
import { useNavigation } from "@react-navigation/native";
import Text_Input from "ultis/component/Text_Input";
import { useDispatch, useSelector } from "react-redux";
import { getImage } from "ultis/functions";

const Profile = memo(() => {
  const {
    login_Session: {
      user_name,
      email: userEmail,
      first_name,
      last_name,
      contact,
      image,
      stripe_account_id: stripe_account,
    },
  } = useSelector((state) => state?.auth);

  const [email, setemail] = useState(userEmail);
  const [password, setpassword] = useState("");
  const [name, setname] = useState(user_name);
  const [firstName, setfirstName] = useState(first_name);
  const [lastName, setlastName] = useState(last_name);
  const [stripAccount, setstripAccount] = useState(stripe_account);
  const [phone, setphone] = useState(contact);

  const { navigate } = useNavigation();
  const [preLoader, setpreLoader] = useState(false);
  const dispatch = useDispatch();

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
  const handleProfile = () => {
    if (
      email != "" &&
      name != "" &&
      firstName != "" &&
      lastName != "" &&
      stripAccount != "" &&
      phone != ""
    ) {
      if (ValidateEmail()) {
        setpreLoader(true);
        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("stripe_account", stripAccount);
        formData.append("contact", phone);

        const jsonData = {
          email,
          first_name: firstName,
          last_name: lastName,
          user_name: name,
          stripe_account_id: stripAccount,
          contact: phone,
        };
        // formData.append("image", email);
        ////console.log("FORMDATA:", formData);
        dispatch(updateProfile(formData, jsonData));
      }
    } else {
      Alert.alert("", "Kindly Fill All The Inputs.");
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Image
          source={{
            uri: getImage(image),
            // "data:image/png;base64,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",
          }}
          style={styles.imageProfile}
        />

        <TextInput
          style={styles.textInput}
          placeholder="soemone@gmail.com..."
          onChangeText={(data) => setemail(data)}
          value={email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="First Name..."
          onChangeText={(data) => setfirstName(data)}
          value={firstName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name..."
          onChangeText={(data) => setlastName(data)}
          value={lastName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Strip Account Number..."
          onChangeText={(data) => setstripAccount(data)}
          value={stripAccount}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number..."
          onChangeText={(data) => setphone(data)}
          value={contact}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Name..."
          onChangeText={(data) => setname(data)}
          value={name}
        />
        {/* <TextInput
        style={styles.textInput}
        placeholder="Account Type Customer..."
        // onChangeText={(data) => setname(data)}
        editable={false}
        value="Logged In as Customer"
      /> */}
        {/* <Text_Input
        secureText={false}
        placeholder="Pakistan..."
        style={[styles.textInput, { backgroundColor: "red" }]}
        setdata={(data) => setemail(data)}
        placeholderColor="#a4a4a4"
      /> */}
        {/* <View style={styles.viewForgotPass}>
        <TouchableOpacity onPress={() => navigate(ROUTES.ForgotPassword)}>
          <Text style={{ color: "#ED3269", fontSize: 12, textAlign: "right" }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View> */}

        <View style={styles.viewCreate}>
          <TouchableOpacity onPress={() => navigate(ROUTES.ChangePassword)}>
            <Text
              style={{
                color: Color.GRAD_COLOR_3,
                textDecorationLine: "underline",
                fontSize: 12,
              }}
            >
              Want to Change Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleProfile}>
          <LinearGradient
            colors={[Color.GRAD_COLOR_3, Color.GRAD_COLOR_3]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 10, marginTop: height_screen * 0.03 }}
          >
            <Text style={styles.loginBtn}>Update</Text>
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
    </ScrollView>
  );
});

export default Profile;

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
    borderColor: Color.GRAD_COLOR_3,
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
    marginTop: height_screen * 0.02,
  },
  imageProfile: {
    height: height_screen * 0.18,
    width: width_screen * 0.35,
    // backgroundColor: "#a4a4a4",
    // resizeMode: "contain",
    borderRadius: 100,
    marginTop: "3%",
  },
});
