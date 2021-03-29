import NoContentFound from "components/NoContentFound";
import dayjs from "dayjs";
import React, { memo, useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import InboxItem from "screens/Inbox/components/InboxItem";
import keyExtractor from "ultis/keyExtractor";

const Inbox = memo(() => {
  const { all_inbox_message_notification: inboxMessages } = useSelector<
    any,
    any
  >((state) => state?.notifications);

  console.log(inboxMessages);

  const renderItem = useCallback(
    ({ item, index }) => {
      const {
        createdAt,
        conversationInfo: { Id, image, name },
        messageText,
      } = item;

      return (
        <InboxItem
          image={image}
          nameUser={name}
          numberMessage={0}
          message={messageText}
          time={dayjs.unix(createdAt?.seconds).format("DD MMM YYYY hh:mm A")}
          key={index}
          conversationId={Id}
        />
      );
    },
    [inboxMessages]
  );

  return (
    <>
      {inboxMessages?.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={inboxMessages}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      ) : (
        <NoContentFound text="No Inbox Message" />
      )}
    </>
  );
});

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
