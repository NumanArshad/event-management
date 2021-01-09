import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FONTS from 'ultis/fonts';
import {height_screen, width_screen} from 'ultis/dimensions';

interface Props {
  avatar: any;
  title: any;
  imageEvent: any;
  event: any;
  time: string;
  un_Read: boolean;
}

const NotificationEvent = memo((props: Props) => {
  const backGroundColor = {backgroundColor: props.un_Read ? '#F7F8FA' : '#FFF'};

  return (
    <TouchableOpacity style={[styles.notificationEvent, backGroundColor]}>
      <Image source={props.avatar} />
      <View style={styles.content}>
        <Text style={styles.txtTitle}>{props.title}</Text>
        <View style={styles.eventStyle}>
          <Image source={props.imageEvent} />
          <View style={styles.description}>
            <Text style={styles.txtEvent}>{props.event}</Text>
            <Text style={styles.txtTime}>{props.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default NotificationEvent;

const styles = StyleSheet.create({
  notificationEvent: {
    height: height_screen * 0.16,
    paddingHorizontal: 0.064 * width_screen,
    paddingVertical: 0.022 * height_screen,
    flexDirection: 'row',
  },
  title: {
    flexDirection: 'row',
  },
  txtTitle: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
  },
  content: {
    marginLeft: 0.04 * width_screen,
  },
  txtEvent: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#353B48',
    marginBottom: 0.01 * height_screen,
  },
  txtTime: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: '#7F8FA6',
  },
  description: {
    marginLeft: 0.04 * width_screen,
  },
  eventStyle: {
    flexDirection: 'row',
    marginTop: 0.02 * height_screen,
  },
});
