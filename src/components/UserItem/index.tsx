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
import { updateFriendRequest, addAuthAsFriend, updateUser } from "redux/users/users.actions";
import { useDispatch, useSelector } from "react-redux";
import FriendRequest from "screens/FriendRequest";

interface Props {
  // user_id: any;
  user_name: string;
  user_type?: string;
  // id: string;
  actionButton?: string;
}

const UserItem = memo((props: any) => {
  // const [follow, setFollow] = useState(false);
  // const onPress = useCallback(() => {
  //   setFollow(!follow);
  //   console.log("ID CLICKED", props.id);
  //   // addFriend(props.id);
  // }, [follow]);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  ////user id and user doc is login user and user info is detail of item user info
  const { actionButton, ...userInfo } = props;

  const onPeopleProfile = useCallback(() => {
    navigation.navigate(ROUTES.PeopleProfile, {
      userInfo,
    });
  }, [navigation]);

  const { user_name, image, id, friends,friendRequests, user_type } = userInfo;

  //@ts-ignore
  const {
    login_Session: { 
      user_id,
      friends: authFriends,
      friendRequests: authFriendRequests, 
      user_doc_id:login_user_doc 
    },
  } = useSelector<any, any>((state) => state?.auth);

  const friendRequestStatus = () => {
    const { status } =
      friendRequests?.find(
        //@ts-ignore
        ({ user_doc_id }) => user_doc_id === login_user_doc
      ) || {};
    return {
      isPending: status === "pending",
      isRejected: status === "rejected",
    };
  };

  const handleFriendRequest = useCallback(() => {
    let updatedFriendRequests = friendRequestStatus()?.isPending
      ? friendRequests?.filter(
          ({user_doc_id}: {user_doc_id:string}) => user_doc_id !== login_user_doc
        )
      : [...friendRequests,
          { user_doc_id: login_user_doc, status: "pending" },
        ];
    //@ts-ignore
    updateFriendRequest(id, updatedFriendRequests);
  }, [userInfo, friendRequests, friendRequestStatus]);

  const handleAcceptRejectRequest = (requestStatus: string) => {
    let updatedFriendRequests = [...authFriendRequests];
    if (requestStatus === "rejected") {
      updatedFriendRequests = updatedFriendRequests?.map(
        ({ user_doc_id, status }) => ({
          user_doc_id,
          status: user_doc_id === id ? "rejected" : status,
        })
      );
      dispatch(updateUser({friendRequests: updatedFriendRequests}, 'profileUpdated'))

    }
    else {
      updatedFriendRequests = updatedFriendRequests?.filter(
        ({user_doc_id}: {user_doc_id:string}) => user_doc_id !== id
      )
      let authUpdatedFriendList = [...authFriends, id];
      let userUpdatedFriendList = [...friends, login_user_doc];
      addAuthAsFriend(id, userUpdatedFriendList);
      dispatch(
        updateUser(
          {
            friends: authUpdatedFriendList,
            friendRequests: updatedFriendRequests,
          },
          "profileUpdated"
        )
      );
    }

  };

 // conpsole.log("people is", userInfo);
  return (
    <TouchableOpacity onPress={onPeopleProfile} style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.txtField}>
        <Text style={styles.txtName}>{user_name}</Text>
        {user_type && <Text style={styles.txtNumberFollower}>{user_type}</Text>}
      </View>
      {actionButton === "addFriend" //&& !friendRequestStatus()?.isRejected 
      ? (
        <TouchableOpacity
          onPress={() => handleFriendRequest()}
          style={styles.svg_Follow}
        >
          {friendRequestStatus()?.isPending ? <SvgFollowed /> : <SvgFollow />}
        </TouchableOpacity>
      ) : props.actionButton === "friendRequest" ? (
        <>
          <TouchableOpacity onPress={() => handleAcceptRejectRequest('accepted')}>
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAcceptRejectRequest('rejected')}>
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
