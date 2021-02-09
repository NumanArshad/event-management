import React, { memo, useCallback, useState } from "react";
import {
  Image,
  StyleSheet,
  Button,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SvgFollowed from "svgs/Followers/SvgFollowed";
import SvgFollow from "svgs/Followers/SvgFollow";
import { width_screen, height_screen } from "ultis/dimensions";
import FONTS from "ultis/fonts";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import { sendFriendRequest } from "redux/users/users.actions";
import { useDispatch } from "react-redux";

interface Props {
  // user_id: any;
  user_name: string;
  user_type?: string;
  // id: string;
  actionButton?: string;
}

const UserItem = memo((props: any) => {
  const [follow, setFollow] = useState(false);
  const onPress = useCallback(() => {
    setFollow(!follow);
    console.log("ID CLICKED", props.id);
    // addFriend(props.id);
  }, [follow]);
  const navigation = useNavigation();

  ////user id and user doc is login user and user info is detail of item user info
  const { actionButton, key, loginUser, ...userInfo } = props;

  const onPeopleProfile = useCallback(() => {
    navigation.navigate(ROUTES.PeopleProfile, {
      userInfo,
    });
  }, [navigation]);

  const { user_name, followers, image, id, friendRequests, user_type } = userInfo;

  const friendRequestStatus = () => {
    const { status } =
      friendRequests?.find(
        //@ts-ignore
        ({ user_doc_id }) => user_doc_id === loginUser?.user_doc_id
      ) || {};
    return {
      isPending: status === "pending",
      isRejected: status === "rejected",
    };
  };

  const handleFriendRequest = useCallback(() => {
    let updatedFriendRequests = friendRequestStatus()?.isPending
      ? friendRequests?.filter(
          (recDocId: string) => recDocId !== loginUser?.user_doc_id
        )
      : [
          ...friendRequests,
          { user_doc_id: loginUser?.user_doc_id, status: "pending" },
        ];
    //@ts-ignore
    sendFriendRequest(id, updatedFriendRequests);
  }, [userInfo, loginUser, friendRequests, friendRequestStatus]);

  const handleAcceptRejectRequest = useCallback(() => {}, [userInfo]);

  console.log("people is", userInfo);
  return (
    <TouchableOpacity onPress={onPeopleProfile} style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.txtField}>
        <Text style={styles.txtName}>{user_name}</Text>
        {user_type && <Text style={styles.txtNumberFollower}>{user_type}</Text>}
      </View>
      {actionButton === "addFriend" && !friendRequestStatus()?.isRejected ? (
        <TouchableOpacity
          onPress={() => handleFriendRequest()}
          style={styles.svg_Follow}
        >
          {friendRequestStatus()?.isPending ? <SvgFollowed /> : <SvgFollow />}
        </TouchableOpacity>
      ) : props.actionButton === "friendRequest" ? (
        <>
          <TouchableOpacity onPress={() => Alert.alert("accept click")}>
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Reject</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </TouchableOpacity>
  );
});

export default UserItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: width_screen,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    marginHorizontal: 0.04 * width_screen,
  },
  txtName: {
    fontFamily: FONTS.Medium,
    fontSize: 16,
    color: "#353B48",
    marginBottom: 0.01 * height_screen,
  },
  txtNumberFollower: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: "#7F8FA6",
  },
  txtField: {
    flex: 1,
  },
  svg_Follow: {
    marginRight: 0.06 * width_screen,
  },
});
