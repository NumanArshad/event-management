import React, {
  memo,
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { StyleSheet, View } from "react-native";
import SvgSend from "svgs/SvgSend";
import FONTS from "ultis/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  getConversation,
  isConversationInitiated,
  sendMessage,
} from "redux/chatServices/chat.actions";
import { getUsersbyDocRefList } from "redux/users/users.actions";

const Chat = () => {
  const {
    params: {
      //@ts-ignore
      receiverUserInfo: {
        user_id: rec_userId,
        user_doc_id: rec_userDocId,
        user_name: rec_userName,
        image: rec_Image,
      },
    },
  } = useRoute();

  const {
    login_Session: { user_doc_id, user_id, user_name, coverImage },
  } = useSelector<any, any>((state) => state?.auth);

  const [messages, setMessages] = useState([
    // {
    //   id: 1,
    //   text: "It's going well! How about you?",
    //   user: { id: 2, name: "Name", avatar: require("@assets/Chat/Hieu.png") },
    // },
    // {
    //   id: 2,
    //   text: "What do you do for a living?",
    //   user: { id: 2, name: "Name", avatar: require("@assets/Chat/Hieu.png") },
    // },
    // {
    //   id: 3,
    //   text: "Hello, My name's Hieu Le.\n" + "Nice to meet you!",
    //   user: { _id: 1, name: "Name", avatar: require("@assets/Chat/Lisa.png") },
    // },
  ]);
  const { setOptions } = useNavigation();

  ///compare id's to preserve same pattern for private chat////
  const conversationId =
    user_id < user_doc_id
      ? `${user_doc_id}_${rec_userDocId}`
      : `${rec_userDocId}_${user_doc_id}`;

  useLayoutEffect(() => {
    setOptions({
      title: rec_userName,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isConversationInitiated(conversationId, {
      sentBy: user_doc_id,
      text: "welcome",
      createdAt: Date.now(),
    });
  }, [user_doc_id, conversationId]);

  useEffect(() => {
    getConversation(conversationId, messages, (res) => {
     // console.log("great messages are", res);
      //@ts-ignore
      let updateMessages = res.map(({ sentBy, text, id, createdAt }) => ({
        //@ts-ignore
        text,
        createdAt,
        _id: id,
        user: {
          _id: sentBy,
          avatar: require("@assets/Chat/Lisa.png"),
        },
      }));

      setMessages(updateMessages);
    });
  }, []);

  const onSend = (newMessage = []) => {
    // @ts-ignore
    const { user, ...messagePayload } = newMessage[0];
    const { text } = messagePayload;
    sendMessage(conversationId, {
      sentBy: user_doc_id,
      createdAt: Date.now(),
      text,
    });
    //setMessages(GiftedChat.append(messages, newMessage));
  };
  const renderbuffer = useCallback((props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#ED3269",
          },
          left: { backgroundColor: "#F1F1F1" },
        }}
        textStyle={{
          right: {
            color: "#FFF",
            fontFamily: FONTS.Regular,
            fontSize: 14,
          },
          left: { color: "#353B48", fontFamily: FONTS.Regular, fontSize: 14 },
        }}
      />
    );
  }, []);

  const renderSend = useCallback((props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <SvgSend style={styles.svgSend} />
        </View>
      </Send>
    );
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        renderBubble={renderbuffer}
        placeholder={"Write a message..."}
        messages={messages}
        onSend={(newMessage) => onSend(newMessage)}
        alwaysShowSend={true}
        showUserAvatar={true}
        renderSend={renderSend}
        user={{
          _id: user_doc_id,
        }}
        textInputProps={{
          fontSize: 14,
          fontFamily: FONTS.Regular,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  sendingContainer: {
    alignSelf: "center",
    top: -10,
    right: 24,
  },
  svgSend: {
    alignSelf: "center",
  },
});
