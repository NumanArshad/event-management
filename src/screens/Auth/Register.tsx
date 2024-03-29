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
  Platform,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { width_screen, height_screen } from "../../ultis/dimensions/index";
import { register } from "redux/auth/auth.actions";
import ROUTES from "ultis/routes";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons, Entypo } from "@expo/vector-icons";
import SubmitButton from "components/buttons/submitButton";
import useImagePicker from "components/ImgPicker";
import Color from "ultis/color";
import { noUserFoundImage } from "ultis/constants";

const Register = memo(() => {
  const dispatch = useDispatch();
  const { image, pickImage, getImageFormConversion, setImage } = useImagePicker();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [cPassword, setcPassword] = useState("");
  const { navigate } = useNavigation();

  const { all_errors } = useSelector<any, any>((state) => state.errors);

  console.log("nice all eror ris", all_errors)

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
    if (email != "" && password != "" && name != "" && cPassword != "") {
      if (ValidateEmail() && validatePassword()) {
       // dispatch(startLoading());
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("user_type", "citizen");
        formData.append("name", name);
        formData.append("password_confirmation", cPassword);
        image !== noUserFoundImage && formData.append("image", getImageFormConversion());

          console.log("hey form dara os", formData)
          setImage(noUserFoundImage);
        dispatch(register(formData));
      }
    } else {
      Alert.alert("", "Kindly Fill All The Inputs.");
    }
  };

  const img =
    "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=612x612&w=0&h=NGxdexflb9EyQchqjQP0m6wYucJBYLfu46KCLNMHZYM=";
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: image || img }} style={styles.imageProfile} />
        <Entypo
          name="cross"
          size={20}
          color="grey"
          style={styles.iconRemove}
          onPress={()=>setImage(noUserFoundImage)}
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
        placeholder="Name..."
        onChangeText={(data) => setname(data)}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Email..."
        onChangeText={(data) => setemail(data)}
      />
       {all_errors && (
          <Text style={{ color: Color.GRAD_COLOR_1 }}>{all_errors?.errors?.email}</Text>
        )}
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
      <View style={styles.viewCreate}>
        <Text style={{ color: Color.GRAD_COLOR_3 }}>
          Already have an Account?{" "}
          <TouchableOpacity onPress={() => navigate(ROUTES.Login)}>
            <Text style={{ textDecorationLine: "underline" }}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <SubmitButton text="Sign Up" onPress={handleRegister} />
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
    height: height_screen * 0.17,
    width: width_screen * 0.33,
    // backgroundColor: "#a4a4a4",
    // resizeMode: "contain",
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: Color.GRAD_COLOR_3,
    marginBottom: height_screen * 0.02,
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
  iconRemove: {
    position: "absolute",
    bottom: height_screen * 0.15,
    left: width_screen * 0.25,
    backgroundColor: "white",
    height: height_screen * 0.035,
    width: width_screen * 0.07,
    borderRadius: 100,
    paddingTop: "10%",
    paddingLeft: "15%",
  },
});
