import React, {
  memo,
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
} from "react-native-gifted-chat";
import { StyleSheet, Text, View } from "react-native";
import SvgSend from "svgs/SvgSend";
import FONTS from "ultis/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
getConversation,
  getRoomUsers,
  isConversationInitiated,
  joinChatRoom,
  leaveChatRoom,
  sendMessage,
} from "redux/chatServices/chat.actions";
import { getUsersbyDocRefList } from "redux/users/users.actions";
import { noFoundImg } from "ultis/constants";
import EventItem from "components/EventItem";
import { formatDateTime, getImage } from "ultis/functions";
import { width_screen } from "ultis/dimensions";
import { alertMessage } from "ultis/alertToastMessages";
import {
  clearSingleEvent,
  getAllTrendingEvents,
} from "redux/events/events.actions";
import isEmpty from "ultis/isEmpty";


const CustomView = (props:any) => {
  const { single_event } = useSelector<any, any>((state) => state?.events);


 // alertMessage("kwfjenj");
  const {
    event_name,
    type_name,
    address,
    event_id,
    lat_long,
    event_date,
    start_time,
    duration,
    rating,
    image
  } = single_event || {};
  return (
    <View style={{ padding: 10, width: "95%" }} {...props}>
      <EventItem
      
        thumbnail={getImage(image)}
        tag={type_name}
        id={event_id}
        eventName={event_name}
        location={address}
        distance={lat_long}
        eventDateTime={formatDateTime(event_date, start_time)}
        rate={rating}
        duration={duration}
        isSmallItem
      />
    </View>
  );
};

const Chat = () => {
  const {
    params: {
      //@ts-ignore
      group: { name, image, members = [] },
      chatType = "privateChat",
      eventShareStatus,
      conversationId,
    },
  } = useRoute();

  const dispatch = useDispatch();

  const isGroupChat = chatType === "groupChat";


  const {
    login_Session: { user_doc_id, user_id, user_name, image: senderImage, deviceToken },
  } = useSelector<any, any>((state) => state?.auth);

  const { single_event = {}, all_trending_events } = useSelector<any, any>(
    (state) => state?.events
  );

//console.log({deviceToken})
  
  const [groupUsers, setGroupUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  const [shareEventDetail, setEventDetail] = useState(single_event);

  const isEventSharing = eventShareStatus && !isEmpty(shareEventDetail);

  const [isEventShare, setIsEventShare] = useState(isEventSharing);

  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      title: name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMemberInfo = userDocId => {
        return groupUsers.find(({id}) => id===userDocId);
  }  


  useEffect(() => {

    if (isGroupChat) {
      !all_trending_events?.length && dispatch(getAllTrendingEvents());
      return;
    }

    isConversationInitiated(conversationId, {
      sentBy: user_doc_id,
      text: "welcome",
      createdAt: Date.now(),
    });
  }, [user_doc_id, conversationId, isGroupChat, members]);

  //console.log(conversationId)

  useEffect(() => {
    //getRoomUsers(conversationId);
    joinChatRoom(conversationId, user_doc_id);

    return () => leaveChatRoom(conversationId, user_doc_id)
  }, []);

  useEffect(() => {
    let groupMembers = isGroupChat ? members : conversationId?.split('_')
   // console.log({groupMembers})
    !groupUsers.length ? getUsersbyDocRefList(groupMembers, setGroupUsers) :
    
    getConversation(conversationId, messages, (res) => {
      //@ts-ignore
      let updateMessages = res.map(({ sentBy, text, id, createdAt }) => ({
        //@ts-ignore
        text,
        createdAt,
        _id: id,
        user: {
          _id: sentBy,
          avatar: getMemberInfo(sentBy)?.image,
        },
      }));
      console.log("my all messagt ob show are", updateMessages)
      setMessages(updateMessages);
    });
  }, [groupUsers]);

  const onSend = (newMessage = []) => {
    // @ts-ignore
    
      isEventShare && setIsEventShare(false);

    const { user, ...messagePayload } = newMessage[0];
    const { text } = messagePayload;
    sendMessage(conversationId, {
      sentBy: user_doc_id,
      createdAt: Date.now(),
      text: isEventSharing ? single_event?.event_id : text,
    }, {user_doc_id, deviceToken},
    groupUsers);

    isEventSharing
      ? setEventDetail(eventDetail => eventDetail = {})
      : setMessages(GiftedChat.append(messages, newMessage));
  };

  const getEventById = (eventId) => {
    return all_trending_events?.find(({ event_id }) => event_id === eventId);
  };

  const renderbuffer = useCallback((props) => {
    const { currentMessage } = props;


    const message = isGroupChat
      ? getEventById(currentMessage?.text)
      : currentMessage?.text;


    return (
      <>
        {isGroupChat && !isEmpty(message) ? (
          <EventItem
            thumbnail={getImage(message?.image)}
            tag={message?.type_name}
            id={message?.event_id}
            eventName={message?.event_name}
            location={message?.address}
            distance={message?.lat_long}
            eventDateTime={formatDateTime(
              message?.event_date,
              message?.start_time
            )}
            rate={message?.rating}
            duration={message?.duration}
            isSmallItem
            key={message?.id}
          />
        ) : (
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
              left: {
                color: "#353B48",
                fontFamily: FONTS.Regular,
                fontSize: 14,
              },
            }}
          />
        )}
      </>
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
      {isGroupChat ? (
        <GiftedChat
          text={isEventShare ? "share event" : ""}
          renderBubble={renderbuffer}
          placeholder={"Write a message..."}
          messages={messages}
          onSend={(newMessage) => onSend(newMessage)}
          alwaysShowSend={isEventShare}
          showUserAvatar={true}
          renderInputToolbar={(props) =>
            isEventShare ? <InputToolbar {...props} /> : null
          }
          renderComposer={(props) =>
            isEventShare ? <CustomView {...props} /> : null
          }
          minComposerHeight={isEventShare ? 0 : 40}
          renderSend={renderSend}
          user={{
            _id: user_doc_id,
            avatar: getImage(senderImage)
          }}
          textInputProps={{
            fontSize: 14,
            fontFamily: FONTS.Regular,
          }}
        />
      ) : (
        <GiftedChat
          renderBubble={renderbuffer}
          placeholder={"Write a message..."}
          messages={messages}
          onSend={(newMessage) => onSend(newMessage)}
          // alwaysShowSend={true}
          showUserAvatar={true}
          renderSend={renderSend}
          user={{
            _id: user_doc_id,
           // name:"jwfn",
            avatar: getImage(senderImage)
          
          }}
          textInputProps={{
            fontSize: 14,
            fontFamily: FONTS.Regular,
          }}
        />
      )}
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
