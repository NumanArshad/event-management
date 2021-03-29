import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Button,
  View,
} from "react-native";
import UserItem from "components/UserItem";
import { getUsersbyDocRefList } from "redux/users/users.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import ROUTES from "ultis/routes";
import isEmpty from "ultis/isEmpty";
import { alertMessage } from "ultis/alertToastMessages";
import { height_screen, width_screen } from "ultis/dimensions";
import useImagePicker from "components/ImgPicker";
import { startButtonLoading, startLoading, stopButtonLoading, stopLoading } from "redux/loading/loading.actions";
import { createGroup, getAuthGroupsObserver } from "redux/groups/groups.actions";
import {
  bulkFirestoreHandler,
  sendNotification,
  sendPushNotification,
} from "redux/notifications/notifications.actions";
import SubmitButton from "components/buttons/submitButton";

const Friendlist = memo(() => {
  const [users, setUsers] = useState([]);

  const [groupMembers, setGroupMembers] = useState([]);

  const { navigate, setOptions, goBack } = useNavigation();

  const { params, name } = useRoute();

  const dispatch = useDispatch();

  const {
    login_Session: { friends, user_doc_id, user_name, deviceToken },
  } = useSelector<any, any>((state) => state?.auth);

  const isUserAdded = (docId) => {
    return groupMembers.includes(docId);
  };

  const { image, uploadImage } = useImagePicker(params?.image);
  // console.log("my image is", image,  params?.image)

  useLayoutEffect(() => {
    if (params?.name) {
      setOptions({
        title: params?.name ?? "",
        headerLeft: () =>
          params?.image ? (
            <Image style={styles.image} source={{ uri: params?.image }} />
          ) : null,
      });
    }
  }, []);

  const handleAddMembers = (memberDocId) => {
    let updateMembersList = [...groupMembers];
    updateMembersList = isUserAdded(memberDocId)
      ? updateMembersList.filter((docId) => docId !== memberDocId)
      : [...updateMembersList, memberDocId];
    setGroupMembers((prev) => (prev = updateMembersList));
  };

  useFocusEffect(
    useCallback(() => {
      getUsersbyDocRefList(friends, setUsers);
    }, [friends])
  );

  const handleCreateGroup = async () => {
    const downloadUrl = await uploadImage();
    if (downloadUrl) {
      dispatch(startButtonLoading());
      const payload = {
        name: params?.name,
        image: downloadUrl,
        members: [...groupMembers, user_doc_id],
        createdBy: user_doc_id,
        createdDate: new Date(),
      };
      createGroup(payload);

      //send group invite push notification to online receipent
      const onlineReceipentDeviceToken = users
        ?.filter(({ id, isOnline }) => groupMembers.includes(id) && isOnline)
        ?.map(({ deviceToken }) => deviceToken);

      const sendPushToken = {
        to: onlineReceipentDeviceToken,
        title: "Group Invite",
        body: `${user_name} added you in group ${params?.name}`,
      };
      sendPushNotification(sendPushToken);

      ///Send Group join notification to all receipent
      const mapBulkNotifications = groupMembers.map((memberDocId) =>
        sendNotification({
          receipentDocId: memberDocId,
          senderDocId: user_doc_id,
          createdAt: new Date(),
          type: "groupInvite",
        })
      );
      bulkFirestoreHandler(mapBulkNotifications, handleGoBack);
    }
  };

  const handleGoBack = () => {
    dispatch(stopButtonLoading());
    dispatch(getAuthGroupsObserver());
    navigate("groups");
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users?.map((user, key) => (
          <UserItem
            key={key}
            actionButton={name}
            handleAddMembers={handleAddMembers}
            isUserAdded={isUserAdded}
            {...user}
          />
        ))}
      </ScrollView>
      <View
        style={{
          width: width_screen * 0.8,
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        {groupMembers?.length ? (
          <SubmitButton text="Create Group" onPress={handleCreateGroup} />
        ) : null}
      </View>
    </>
  );
});

export default Friendlist;

const styles = StyleSheet.create({
  image: {
    marginHorizontal: 0.04 * width_screen,
    width: width_screen * 0.1,
    height: height_screen * 0.05,
    borderRadius: 100,
  },
});
