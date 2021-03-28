import React, {memo, useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {height_screen, width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';
import { getImage } from 'ultis/functions';
import { noFoundImg } from 'ultis/constants';

interface Props {
  image: string;
  nameUser: string;
  numberMessage: number;
  message: string;
  time: string;
  conversationId: string
}

const InboxItem = memo((props: Props) => {
  const backGroundColor = {
    backgroundColor: props.numberMessage !== 0 ? '#F7F8FA' : '#FFF',
  };
  const navigation = useNavigation();

  // const onChat = useCallback(() => {
  //   navigation.navigate(ROUTES.Chat, 
  //     {
  //       group: {
  //         name: props.nameUser,
  //         image: props.image,
  //       },
  //       conversationId: props.conversationId 
  //     });
  // }, [navigation]);

  return (
    <TouchableOpacity
      // onPress={onChat}

      style={[styles.inboxItem, backGroundColor]}>
      <Image style={styles.avatar} source={{uri:props.image}} />
      <View style={styles.content}>
          <Text style={styles.txtNameUser}>
            {props.nameUser}{' '}
            {/* {props.numberMessage !== 0 ? `(${props.numberMessage})` : ''} */}
          </Text>
          <Text style={styles.txtMessage}>{props.message}</Text>
          <Text style={styles.txtTime}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
});
export default InboxItem;

const styles = StyleSheet.create({
  inboxItem: {
    // height: 0.098 * height_screen,
    flexDirection: 'row',
    paddingHorizontal: 0.064 * width_screen,
    paddingVertical: 0.022 * height_screen,
  },
  avatar: {
     marginTop: 3,
    width: width_screen * 0.17,
    height: height_screen * 0.085,
    borderRadius: 100,
  },
  txtNameUser: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#353B48',
  },
  txtNumberMessage: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
  },
  txtTime: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: '#7F8FA6',
  },
  txtMessage: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    marginVertical: 0.01 * height_screen,
    color: '#353B48',
  },
  content: {
    marginLeft: 0.04 * width_screen,
    
  },
  flex: {
    flex: 1,
  },
  flexDirection: {
    flexDirection: 'row',
  },
});
