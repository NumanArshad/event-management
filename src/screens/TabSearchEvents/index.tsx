import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SearchBar from "components/SearchBar";
import ListEvent from "screens/TabSearchEvents/components/ListEvent";
import ListHotKeysNews from "screens/SearchNews/components/ListHotKeysNews";
import { adsBannerId } from "data/ads";
import { AdMobBanner } from "expo-ads-admob";
import UserItem from "components/UserItem";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { height_screen, width_screen } from "ultis/dimensions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import { getAuthGroupsObserver } from "redux/groups/groups.actions";
import { alertMessage } from "ultis/alertToastMessages";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "ultis/isEmpty";

const TabSearchEvents = memo(() => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toCreateGroup = () => {
    navigation.navigate(ROUTES.CreateGroup);
  };
  const [groupList, setGroupList] = useState([]);

  useFocusEffect(
    useCallback(() => {
     // alertMessage("hey back");
      dispatch(getAuthGroupsObserver(setGroupList));
    }, [dispatch])
  );

  console.log("auth user group are", groupList);
  return (
    <View style={styles.container}>
      <ScrollView>
        {isEmpty(groupList) ? (
          <Text>...loading</Text>
        ) : !groupList?.length ? (
          <Text>No group found</Text>
        ) : (
          groupList.map(
            ({
              image,
              name,
              id,
            }: {
              image: string;
              name: string;
              id: string;
            }) => 
            <UserItem
             image={image} 
             user_name={name} 
             key={id} 
             />
          )
        )}
      </ScrollView>
      {/* <TouchableOpacity style={styles.iconPlus}> */}
      <Ionicons
        name="create-outline"
        size={30}
        color="#fff"
        style={styles.iconPlus}
        onPress={toCreateGroup}
      />
      {/* </TouchableOpacity> */}
    </View>
  );
});

export default TabSearchEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  iconPlus: {
    position: "absolute",
    bottom: height_screen * 0.05,
    height: height_screen * 0.075,
    width: width_screen * 0.15,
    backgroundColor: "#ED3269",
    borderRadius: 50,
    paddingLeft: width_screen * 0.035,
    paddingTop: height_screen * 0.01,
    alignSelf: "flex-end",
    right: width_screen * 0.05,
    borderWidth: 0.4,
    borderColor: "#a4a4a4",
  },
});
