import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Modal,
  Alert,
  Animated,
  TextInput,
  Image,
  Button,
} from "react-native";
import keyExtractor from "ultis/keyExtractor";
import TicketItem from "screens/ProfileTickets/components/TicketItem";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { height_screen, width_screen } from "ultis/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import FONTS from "ultis/fonts";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Color from "ultis/color";
import SubmitButton from "components/buttons/submitButton";
import { getUsersbyDocRefList } from "redux/users/users.actions";
import useImagePicker from "components/ImgPicker";
import { noFoundImg } from "ultis/constants";
import { createGroup } from "redux/groups/groups.actions";
import {
  bulkFirestoreHandler,
  sendNotification,
} from "redux/notifications/notifications.actions";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { alertMessage } from "ultis/alertToastMessages";
import { startLoading, stopLoading } from "redux/loading/loading.actions";
import NoContentFound from "components/NoContentFound";

const CreateGroup = () => {
  const dispatch = useDispatch();
  const scrollX = useRef(new Animated.Value(0)).current;

  const { image, pickImage, uploadImage } = useImagePicker();
  const { navigate } = useNavigation();

  const {
    login_Session: { user_doc_id, friends },
  } = useSelector((state) => state?.auth);

  const [formData, setFormData] = useState({
    name: "",
    members: [],
  });

  const { name, members } = formData;

  useEffect(() => {
    getUsersbyDocRefList(friends, (members) =>
      setFormData((prevState) => ({
        ...prevState,
        members,
      }))
    );
  }, []);


  const { goBack } = useNavigation();

  const handleSubmit = () => {
    navigate('add_member', {
      name,
      image
    })
  };



  return (
    <View style={styles.container}>
      {!friends?.length ?
        <NoContentFound text="You must have atleast one friend to create group" />
        :
        <ScrollView
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        >
          <Image
            style={styles.img}
            source={{
              uri: image,
            }}
          />
          <Ionicons
            name="create-outline"
            size={18}
            color="black"
            onPress={pickImage}
            style={styles.iconEdit}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter name..."
            onChangeText={(name) => setFormData({ ...formData, name })}
            value={name}
          />
          <View
            style={{
              width: width_screen * 0.8,
              alignSelf: "center",
            }}
          >
            <SubmitButton
              text="Add Member"
              onPress={handleSubmit}
              isDisabled={!friends?.length}
            />
          </View>


        </ScrollView>
      }
    </View>
  );
};
export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: height_screen * 0.01,
    marginHorizontal: width_screen * 0.01,
  },
  textInput: {
    height: height_screen * 0.07,
    width: width_screen * 0.8,
    borderWidth: 0.8,
    borderColor: Color.GRAD_COLOR_3,
    borderRadius: 10,
    marginTop: height_screen * 0.03,
    paddingLeft: height_screen * 0.02,
    alignSelf: "center",
  },
  img: {
    width: width_screen * 0.38,
    height: height_screen * 0.19,
    borderRadius: 100,
    borderColor: "rgba(255, 255, 255, 0.4)",
    overflow: "hidden",
    alignSelf: "center",
  },
  img2: {
    width: width_screen * 0.15,
    height: height_screen * 0.07,
    borderRadius: 100,
    borderColor: "rgba(255, 255, 255, 0.4)",
    overflow: "hidden",
    alignSelf: "center",
  },
  iconEdit: {
    position: "absolute",
    top: height_screen * 0.14,
    left: width_screen * 0.57,
    backgroundColor: "white",
    height: height_screen * 0.04,
    width: width_screen * 0.08,
    borderRadius: 100,
    padding: "17%",
    // borderWidth: 0.3,
    // borderColor: "#a4a4a4",
  },
  userName: {
    marginLeft: width_screen * 0.05,
  },
  selectpeople: {
    flexDirection: "row",
    alignItems: "center",
    width: width_screen * 0.8,
    alignSelf: "center",
    borderWidth: 0.8,
    borderColor: "#F05F3E",
    borderRadius: 10,
    padding: height_screen * 0.01,
    marginTop: 1,
  },
});
