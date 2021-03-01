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
import { Ionicons } from "@expo/vector-icons";
import useImagePicker from "components/ImgPicker";

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

  const {loading} = useSelector(state => state?.loading)

  console.log({  user_name,
    email: userEmail,
    first_name,
    last_name,
    contact,
    image})

    console.log({image})

  const [email, setemail] = useState(userEmail);
  const [password, setpassword] = useState("");
  const [name, setname] = useState(user_name);
  const [firstName, setfirstName] = useState(first_name);
  const [lastName, setlastName] = useState(last_name);
  const [stripAccount, setstripAccount] = useState(stripe_account);
  const [phone, setphone] = useState(contact);

  const {image: img, pickImage} = useImagePicker(image)

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
        formData.append("image", img)

        const jsonData = {
          email,
          first_name: firstName,
          last_name: lastName,
          user_name: name,
          stripe_account_id: stripAccount,
          contact: phone,
          image: img
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
     <View >
        <Image
          source={{ uri: getImage(img) }}
          style={styles.imageProfile}
        />
        <Ionicons
          name="create-outline"
          size={18}
          color="black"
          style={styles.iconEdit}
          onPress={pickImage}
        />
      </View>

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
        //  secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number..."
          onChangeText={(data) => setphone(data)}
          value={phone}
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
                animating={loading}
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
  iconEdit: {
    position: "absolute",
    top: height_screen * 0.12,
    left: width_screen * 0.25,
    backgroundColor: "white",
    height: height_screen * 0.035,
    width: width_screen * 0.07,
    borderRadius: 100,
    paddingTop: "10%",
    paddingLeft: "15%",
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
  mask: {
    width: 0.87 * width_screen,
    height: 400,
    backgroundColor: "#FFF",
    alignSelf: "center",
    marginTop: -0.06 * height_screen,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.3,
    marginBottom: 32,
  },
  imageProfile: {
    height: height_screen * 0.18,
    width: width_screen * 0.35,
    // backgroundColor: "#a4a4a4",
     resizeMode: "contain",
    borderRadius: 100,
    marginTop: "3%",
  },
});
