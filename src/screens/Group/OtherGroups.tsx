import React, { memo, useCallback, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SearchBar from "components/SearchBar";
// import ListEvent from "screens/OtherGroups/components/ListEvent";
import { adsBannerId } from "data/ads";
import { AdMobBanner } from "expo-ads-admob";
import UserItem from "components/UserItem";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { height_screen, width_screen } from "ultis/dimensions";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import ROUTES from "ultis/routes";
import { getOtherGroups } from "redux/groups/groups.actions";
import { useDispatch } from "react-redux";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Color from "ultis/color";
import NoContentFound from "components/NoContentFound";

const OtherGroups = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { params } = useRoute();

  const [groupList, setGroupList] = useState(null);

  useFocusEffect(
    useCallback(() => {
      dispatch(getOtherGroups(setGroupList));
    }, [dispatch])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {!groupList ? (
          <Text>...loading</Text>
        ) : !groupList?.length ? (
          <NoContentFound text="No group found"/>
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
              members: string[];
              id: string;
            }) => (
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
          )
        )}
      </ScrollView>
    </View>
  );
});

export default OtherGroups;

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
    backgroundColor: Color.GRAD_COLOR_3,
    borderRadius: 50,
    paddingLeft: width_screen * 0.035,
    paddingTop: height_screen * 0.01,
    alignSelf: "flex-end",
    right: width_screen * 0.05,
    borderWidth: 0.4,
    borderColor: "#a4a4a4",
  },
});
