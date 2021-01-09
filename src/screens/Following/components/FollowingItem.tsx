import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {width_screen, height_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import SvgUn_follow from 'svgs/Following/SvgUnfollow';

interface Props {
  image?: any;
  name: string;
  numberFollower: number;
  un_Follow: boolean;
}

const FollowingItem = memo((props: Props) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image style={styles.image} source={props.image} />
      <View style={styles.txtField}>
        <Text style={styles.txtName}>{props.name}</Text>
        <Text style={styles.txtNumberFollower}>
          {props.numberFollower} followers
        </Text>
      </View>
      <TouchableOpacity style={styles.svg_Follow}>
        {props.un_Follow ? <SvgUn_follow /> : null}
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

export default FollowingItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: width_screen,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    marginHorizontal: 0.04 * width_screen,
  },
  txtName: {
    fontFamily: FONTS.Medium,
    fontSize: 16,
    color: '#353B48',
    marginBottom: 0.01 * height_screen,
  },
  txtNumberFollower: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#7F8FA6',
  },
  txtField: {
    flex: 1,
  },
  svg_Follow: {
    marginRight: 0.06 * width_screen,
  },
});
