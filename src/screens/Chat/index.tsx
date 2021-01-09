import React, {memo, useCallback, useState} from 'react';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {StyleSheet, View} from 'react-native';
import SvgSend from 'svgs/SvgSend';
import FONTS from 'ultis/fonts';
import {useNavigation} from '@react-navigation/native';
const Chat = memo(() => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "It's going well! How about you?",
      user: {_id: 2, name: 'Name', avatar: require('@assets/Chat/Lisa.png')},
    },
    {
      _id: 1,
      text: 'What do you do for a living?',
    },
    {
      _id: 1,
      text: "Hello, My name's Hieu Le.\n" + 'Nice to meet you!',
      user: {_id: 1, name: 'Name', avatar: require('@assets/Chat/Hieu.png')},
    },
  ]);
  const {setOptions} = useNavigation();

  React.useLayoutEffect(() => {
    setOptions({
      title: 'Charlotte Gregory',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSend = (newMessage = []) => {
    // @ts-ignore
    setMessages(GiftedChat.append(messages, newMessage));
  };
  const renderbuffer = useCallback(props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#ED3269',
          },
          left: {backgroundColor: '#F1F1F1'},
        }}
        textStyle={{
          right: {
            color: '#FFF',
            fontFamily: FONTS.Regular,
            fontSize: 14,
          },
          left: {color: '#353B48', fontFamily: FONTS.Regular, fontSize: 14},
        }}
      />
    );
  }, []);

  const renderSend = useCallback(props => {
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
        placeholder={'Write a message...'}
        messages={messages}
        onSend={newMessage => onSend(newMessage)}
        alwaysShowSend={true}
        showUserAvatar={true}
        renderSend={renderSend}
        user={{
          _id: 1,
        }}
        textInputProps={{
          fontSize: 14,
          fontFamily: FONTS.Regular,
        }}
      />
    </View>
  );
});

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  sendingContainer: {
    alignSelf: 'center',
    top: -10,
    right: 24,
  },
  svgSend: {
    alignSelf: 'center',
  },
});
