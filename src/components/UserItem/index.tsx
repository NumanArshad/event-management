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
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

import {
  updateFriendRequest,
  addAuthAsFriend,
  updateUser,
} from "redux/users/users.actions";
import { useDispatch, useSelector } from "react-redux";
import FriendRequest from "screens/FriendRequest";
import {
  sendNotification,
  deleteNotification,
  sendPushNotification,
} from "redux/notifications/notifications.actions";
import { noFoundImg } from "ultis/constants";
import { getImage } from "ultis/functions";
import { alertMessage } from "ultis/alertToastMessages";

interface Props {
  // user_id: any;
  user_name: string;
  user_type?: string;
  // id: string;
  actionButton?: string;
  handleAddMembers?: (memberDocId: string) => void;
  isUserAdded?: (memberDocId: string) => void;
}

const UserItem = (props: any) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  ////user id and user doc is login user and user info is detail of item user info
  const { actionButton, ...userInfo } = props;

  const onPeopleProfile = useCallback(() => {
    navigation.navigate(ROUTES.PeopleProfile, {
      userInfo,
    });
  }, [navigation]);

  const {
    user_name,
    image,
    id,
    friends,
    friendRequests,
    user_type,
    deviceToken,
    isOnline: isReceipentOnline,
  } = userInfo;

  //@ts-ignore
  const {
    login_Session: {
      user_id,
      user_name: authName,
      friends: authFriends,
      friendRequests: authFriendRequests,
      user_doc_id: login_user_doc,
    },
  } = useSelector<any, any>((state) => state?.auth);

  const handleItemPress = () => {
    props.isGroupItem ? handleGroupNavigation() : onPeopleProfile();
  };

  const handleGroupNavigation = () => {
    const filterAuthUser = props.members.filter(
      (docId: string) => docId !== login_user_doc
    );

    navigation.navigate(ROUTES.Chat, {
      group: {
        name: user_name,
        image,
        members: filterAuthUser,
      },
      chatType: "groupChat",
      conversationId: id,
      eventShareStatus: props.eventShareStatus,
    });
  };

  const friendRequestStatus = () => {
    const { status = "rejected" } =
      friendRequests?.find(
        //@ts-ignore
        ({ user_doc_id }) => user_doc_id === login_user_doc
      ) || {};
    return {
      isPending: status === "pending",
      isRejected: status === "rejected",
    };
  };

  //console.log(user_name,deviceToken, isOnline)
  const handleFriendRequest = useCallback(() => {
    let updatedFriendRequests = friendRequestStatus()?.isPending
      ? friendRequests?.filter(
          ({ user_doc_id }: { user_doc_id: string }) =>
            user_doc_id !== login_user_doc
        )
      : [...friendRequests, { user_doc_id: login_user_doc, status: "pending" }];
    //@ts-ignore
    updateFriendRequest(id, updatedFriendRequests);

    if (friendRequestStatus()?.isRejected) {
      sendNotification({
        receipentDocId: id,
        senderDocId: login_user_doc,
        type: "friendRequest",
        createdAt: new Date(),
      });
      if (isReceipentOnline) {
        const pushTokenPayload = {
          to: deviceToken,
          title: "Friend Request",
          body: `${authName} send you friend request`,
        };
        sendPushNotification(pushTokenPayload);
      }
      return;
    }
    deleteNotification(login_user_doc, id, "friendRequest");

    //   : deleteNotification(login_user_doc, id, "friendRequest");
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
      dispatch(
        updateUser({ friendRequests: updatedFriendRequests }, "profileUpdated")
      );
    } else {
      updatedFriendRequests = updatedFriendRequests?.filter(
        ({ user_doc_id }: { user_doc_id: string }) => user_doc_id !== id
      );
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

    ///notification for accept/reject
    // if (friendRequestStatus()?.isRejected) {
    sendNotification({
      receipentDocId: id,
      senderDocId: login_user_doc,
      type: `Friend Request ${requestStatus}`,
      createdAt: new Date(),
    });
    if (isReceipentOnline) {
      const pushTokenPayload = {
        to: deviceToken,
        title: `Friend Request ${requestStatus}`,
        body: `${authName} ${requestStatus} your friend request`,
      };
      sendPushNotification(pushTokenPayload);
    }
    // return;
    // }
    /////////

    deleteNotification(id, login_user_doc, "friendRequest");
  };

  // conpsole.log("people is", userInfo);
  return (
    <TouchableOpacity onPress={handleItemPress} style={styles.card}>
      <Image style={styles.image} source={{ uri: getImage(image, "user") }} />
      <View style={styles.txtField}>
        <Text style={styles.txtName}>{user_name}</Text>
        {user_type && <Text style={styles.txtNumberFollower}>{user_type}</Text>}
      </View>
      {actionButton === "addFriend" ? ( //&& !friendRequestStatus()?.isRejected
        <TouchableOpacity
          onPress={() => handleFriendRequest()}
          style={styles.svg_Follow}
        >
          {friendRequestStatus()?.isPending ? <SvgFollowed /> : <SvgFollow />}
        </TouchableOpacity>
      ) : props.actionButton === "friendRequest" ? (
        <View style={styles.requestView}>
          <TouchableOpacity
            onPress={() => handleAcceptRejectRequest("accepted")}
          >
            <Text style={styles.acceptStyle}>
              Accept{" "}
              <FontAwesome5
                name="check"
                size={12}
                color="green"
                style={styles.iconStyle}
                // onPress={onProfile}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAcceptRejectRequest("rejected")}
          >
            {/* <Text style={styles.rejectStyle}>
              Reject{" "} */}
            {/* <FontAwesome5
                name="times"
                size={12}
                color="red"
                style={styles.iconStyle}
                // onPress={onProfile}
              /> */}
            {/* </Text> */}
            <Text
              style={[
                styles.acceptStyle,
                {
                  color: "red",
                  borderColor: "red",
                  paddingVertical: height_screen * 0.006,
                  marginTop: height_screen * 0.01,
                },
              ]}
            >
              Reject{" "}
              <FontAwesome5
                name="times"
                size={12}
                color="red"
                style={styles.iconStyle}
                // onPress={onProfile}
              />
            </Text>
          </TouchableOpacity>
        </View>
      ) : actionButton === "add_member" ? (
        <TouchableOpacity
          onPress={() => props.handleAddMembers(id)}
          style={styles.svg_Follow}
        >
          <AntDesign
            name={!props.isUserAdded(id) ? "addusergroup" : "deleteusergroup"}
            size={26}
            color="black"
            style={styles.iconStyle}
            // onPress={onProfile}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

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
    width: width_screen * 0.15,
    height: height_screen * 0.07,
    borderRadius: 100,
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
  acceptStyle: {
    color: "green",
    borderWidth: 0.4,
    padding: "1%",
    borderColor: "green",
    borderRadius: 5,
    textAlign: "center",
  },
  rejectStyle: {
    color: "red",
    borderWidth: 0.4,
    padding: "1%",
    borderColor: "red",
    borderRadius: 5,
    textAlign: "center",
    marginTop: height_screen * 0.01,
    paddingVertical: "5%",
  },
  requestView: {
    marginRight: width_screen * 0.03,
  },
});
