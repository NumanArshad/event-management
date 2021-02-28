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
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import { getAuthGroupsObserver } from "redux/groups/groups.actions";
import { useDispatch } from "react-redux";

const TabSearchEvents = memo(() => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    params,
  } = useRoute();

  const toCreateGroup = () => {
    navigation.navigate(ROUTES.CreateGroup);
  };
  const [groupList, setGroupList] = useState(null);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAuthGroupsObserver(setGroupList));
    }, [dispatch])
  );


  console.log({groupList})
  return (
    <View style={styles.container}>
      <ScrollView>
        {!groupList ? (
          <Text>...loading</Text>
        ) : !groupList?.length ? (
          <Text>No group found</Text>
        ) : (
          groupList.map(
            ({
              image,
              name,
              members,
              id,
            }: {
              image: string;
              name: string;
              members: string[]
              id: string;
            }) => 
            <UserItem
             image={image} 
             user_name={name} 
             key={id} 
             id={id}
             members={members}
             isGroupItem
            eventShareStatus={params?.eventShare}
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
