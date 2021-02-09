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
import Text_Input from "ultis/component/Text_Input";
import Logo from "../../assets/logo.jpg";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import SubmitButton from "components/buttons/submitButton";

const Register = memo((navigation) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

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
    if (email != "" && password != "" && name != "" && cPassword != "") {
      if (ValidateEmail() && validatePassword()) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("user_type", "citizen");
        formData.append("name", name);
        formData.append("password_confirmation", cPassword);
        // formData.append("image", {
        //   uri: image,
        //   name: name + ".jpg",
        //   type: "image/jpg",
        // });

        ////console.log("FORMDATA:", formData);
        dispatch(register(formData));
      }
    } else {
      Alert.alert("", "Kindly Fill All The Inputs.");
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "",
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    ////console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const img =
    "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=612x612&w=0&h=NGxdexflb9EyQchqjQP0m6wYucJBYLfu46KCLNMHZYM=";
  return (
    <View style={styles.container}>
      <View>
        <Image
          // source={{
          //   uri:
          //     "https://i.pinimg.com/originals/f6/db/9b/f6db9b785d37c154c2be26b7c32604b6.jpg",
          // }}
          source={{ uri: image ? image : img }}
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
      <View style={styles.viewCreate}>
        <Text style={{ color: "#ED3269" }}>
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
    borderColor: "#F05F3E",
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
});
