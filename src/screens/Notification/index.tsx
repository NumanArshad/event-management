import React, { memo, useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import NotificationMessage from "screens/Notification/components/NotificationMessage";
import NotificationEvent from "screens/Notification/components/NotificationEvent";
import keyExtractor from "ultis/keyExtractor";
import { useDispatch, useSelector } from "react-redux";
import { getAuthNotifications } from "redux/notifications/notifications.actions";
import { getUsersbyDocRefList } from "redux/users/users.actions";
import dayjs from "dayjs";
import { getImage } from "ultis/functions";
import NoContentFound from "components/NoContentFound";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export enum TYPE_NOTIFICATION {
  MESSAGE,
  EVENT,
}

// const data = [
//   {
//     typeNotification: TYPE_NOTIFICATION.MESSAGE,
//     avatar: require("assets/Notification/Sandra.png"),
//     userName: "Sandra Minalo",
//     message: '"Hi, My name\'s Sandra Minalo. Can I..."',
//     time: "2 HOURS AGO",
//     un_Read: true,
//   },
//   {
//     typeNotification: TYPE_NOTIFICATION.MESSAGE,
//     avatar: require("assets/Notification/Linnie.png"),
//     userName: "Linnie Lyons",
//     message: '"What do you do for a living?"',
//     time: "SAT, 18 FEB 13:00",
//     un_Read: false,
//   },
//   {
//     typeNotification: TYPE_NOTIFICATION.EVENT,
//     avatar: require("assets/Notification/Linnie.png"),
//     title: "You win ticket to the NY premiere of Star",
//     imageEvent: require("assets/Notification/Event.png"),
//     event: '"Bottled Art" Wine\n' + "Painting Nigh",
//     time: "SAT, 18 FEB 13:00",
//     un_Read: true,
//   },
//   {
//     typeNotification: TYPE_NOTIFICATION.MESSAGE,
//     avatar: require("assets/Notification/Olga.png"),
//     userName: "Olga Moss",
//     message: "\"Hi, My name's Olga Moss. Nice to meet…”",
//     time: "2 HOURS AGO",
//     un_Read: false,
//   },
//   {
//     typeNotification: TYPE_NOTIFICATION.EVENT,
//     avatar: require("assets/Notification/Linnie.png"),
//     title: "You win ticket",
//     imageEvent: require("assets/Notification/WWE.png"),
//     event: "Win 2 tickets to WWE @\n" + " MSG",
//     time: "SUN, MAR. 25  -  4:30 PM EST",
//     un_Read: true,
//   },
//   {
//     typeNotification: TYPE_NOTIFICATION.EVENT,
//     avatar: require("assets/Notification/Linnie.png"),
//     title: "You win ticket",
//     imageEvent: require("assets/Notification/Art.png"),
//     event: '"Bottled Art" Wine\n' + " Painting Night",
//     time: "SUN, MAR. 25  -  4:30 PM EST",
//     un_Read: true,
//   },
//   {
//     typeNotification: TYPE_NOTIFICATION.MESSAGE,
//     avatar: require("assets/Notification/Linnie.png"),
//     userName: "Linnie Lyons",
//     message: '"What do you do for a living?"',
//     time: "SAT, 18 FEB 13:00",
//     un_Read: false,
//   },
// ];

const Notification = memo(() => {
  const { all_notifications } = useSelector<any, any>(
    (state) => state?.notifications
  );

  const [notificationUsers, setNotificationUsers] = useState([]);

  useEffect(() => {
    const docIdList = all_notifications?.map(
      ({ senderDocId }: { senderDocId: any }) => senderDocId
    );
    getUsersbyDocRefList(docIdList, setNotificationUsers);
  }, [all_notifications]);

  const renderItem = useCallback(({ item, index }) => {
    const {
      type,
      avatar,
      userName,
      message,
      time,
      un_Read,
      title,
      imageEvent,
      event,
    } = item;
    return (
      <NotificationMessage
        avatar={getImage(notificationUsers[index]?.image)}
        userName={notificationUsers[index]?.user_name}
        message={type}
        time={dayjs
          .unix(all_notifications[index]?.createdAt?.seconds)
          .format("DD MMM YYYY hh:mm A")}
        un_Read={false}
      />
    );
    // : (
    //   <NotificationEvent
    //     avatar={data[index]?.avatar}
    //     title={title}
    //     imageEvent={imageEvent}
    //     event={event}
    //     time={time}
    //     un_Read={un_Read}
    //   />
    // );
  }, [notificationUsers, all_notifications]);

  console.log(!all_notifications, notificationUsers);
  return (
    <>
      {!all_notifications?.length ? (
        // <Text>... No Notification Found</Text>
        <NoContentFound text="No Notification Found" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={all_notifications}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </>
  );
});

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
