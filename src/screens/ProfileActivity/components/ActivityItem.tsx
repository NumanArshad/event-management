import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TYPE_ACTIVITY} from 'screens/ProfileActivity';
import {height_screen, width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import SvgJoin from 'svgs/Activity/SvgJoin';
import SvgCart from 'svgs/Activity/SvgCart';

interface Props {
  typeActivity: TYPE_ACTIVITY;
  time_Do_Activity: string;
  img: any;
  titlePost: string;
  timePost: string;
}

const ActivityItem = (props: Props) => {
  return (
    <TouchableOpacity style={styles.activityItem}>
      {props.typeActivity === 0 ? (
        <SvgJoin style={styles.svg} />
      ) : (
        <SvgCart style={styles.svg} />
      )}
      <View style={styles.container}>
        {props.typeActivity === 0 ? (
          <Text style={styles.txtJoin}>Joined the list:</Text>
        ) : (
          <Text style={styles.txtBought}>Bought tickets:</Text>
        )}
        <Text style={styles.txtTime_Do}>{props.time_Do_Activity}</Text>
      </View>
      <View style={styles.content}>
        <Image style={styles.img} source={props.img} />
        <View>
          <Text style={styles.txtTitlePost}>{props.titlePost}</Text>
          <Text style={styles.txtTimePost}>{props.timePost}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  activityItem: {
    backgroundColor: '#FFF',
    width: width_screen,
    paddingLeft: 0.17 * width_screen,
    paddingRight: 0.064 * width_screen,
    paddingTop: 24,
  },
  svg: {
    position: 'absolute',
    marginTop: 24,
    marginLeft: 24,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtJoin: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
  },
  txtBought: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
  },
  txtTime_Do: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: '#7F8FA6',
  },
  img: {
    borderRadius: 10,
    marginRight: 16,
  },
  content: {
    flexDirection: 'row',
    marginTop: 17,
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
