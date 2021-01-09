import React, {memo, useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {height_screen, width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';

interface Props {
  image: any;
  nameUser: string;
  numberMessage: number;
  message: string;
  time: string;
}

const InboxItem = memo((props: Props) => {
  const backGroundColor = {
    backgroundColor: props.numberMessage !== 0 ? '#F7F8FA' : '#FFF',
  };
  const navigation = useNavigation();
  const onChat = useCallback(() => {
    navigation.navigate(ROUTES.Chat);
  }, [navigation]);
  return (
    <TouchableOpacity
      onPress={onChat}
      style={[styles.inboxItem, backGroundColor]}>
      <Image style={styles.avatar} source={props.image} />
      <View style={styles.flex}>
        <View style={styles.content}>
          <Text style={styles.txtNameUser}>
            {props.nameUser}{' '}
            {props.numberMessage !== 0 ? `(${props.numberMessage})` : ''}
          </Text>
          <Text style={styles.txtTime}>{props.time}</Text>
        </View>
        <Text style={styles.txtMessage}>{props.message}</Text>
      </View>
    </TouchableOpacity>
  );
});
export default InboxItem;

const styles = StyleSheet.create({
  inboxItem: {
    height: 0.098 * height_screen,
    flexDirection: 'row',
    paddingHorizontal: 0.064 * width_screen,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 0.033 * width_screen,
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
    color: '#353B48',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0.01 * height_screen,
  },
  flex: {
    flex: 1,
  },
  flexDirection: {
    flexDirection: 'row',
  },
});
