import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {height_screen, width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';

interface Props {
  img: any;
  titlePost: string;
  timePost: string;
}

const TicketItem = (props: Props) => {
  return (
    <TouchableOpacity style={styles.ticketItem}>
      <Image style={styles.img} source={props.img} />
      <View>
        <Text style={styles.txtTitlePost}>{props.titlePost}</Text>
        <Text style={styles.txtTimePost}>{props.timePost}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TicketItem;

const styles = StyleSheet.create({
  ticketItem: {
    flexDirection: 'row',
    paddingHorizontal: 0.064 * width_screen,
    paddingVertical: 0.025 * height_screen,
    backgroundColor: '#FFF',
  },
  img: {
    borderRadius: 10,
    marginRight: 16,
  },
  txtTitlePost: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#353B48',
    marginBottom: 0.01 * height_screen,
  },
  txtTimePost: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: '#7F8FA6',
  },
});
