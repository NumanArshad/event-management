import React, {memo, useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {height_screen, width_screen} from 'ultis/dimensions';
import {LinearGradient} from 'expo-linear-gradient';
import FONTS from 'ultis/fonts';
import SvgArrDown from 'svgs/SvgArrDown';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';

interface Props {
  coverImage: any;
  avatar: any;
  userName: string;
  address: string;
  followers: string;
  following: number;
  interested: string[];
}

const HeaderPeopleProfile = memo((props: Props) => {
  const navigation = useNavigation();
  const onChat = useCallback(() => {
    navigation.navigate(ROUTES.Chat);
  }, [navigation]);
  const onFollower = useCallback(() => {
    navigation.navigate(ROUTES.TabFollowers);
  }, [navigation]);
  const onFollowing = useCallback(() => {
    navigation.navigate(ROUTES.TabFollowers);
  }, [navigation]);
  return (
    <View style={styles.headerProfile}>
      <Image style={styles.coverImage} source={props.coverImage} />
      <LinearGradient
        style={styles.linear}
        colors={['#000', 'rgba(1, 1, 1, 0.0001)']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
      />
      <View style={styles.mask}>
        <Image style={styles.img} source={props.avatar} />
        <Text style={styles.userName}>{props.userName}</Text>
        <Text style={styles.address}>{props.address}</Text>
        <View style={styles.btn}>
          <TouchableOpacity onPress={onChat} style={styles.inbox}>
            <Text style={styles.txtInbox}>MESSAGE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.follow}>
            <Text style={styles.txtFollow}>FOLLOW</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.followStyle}>
          <TouchableOpacity onPress={onFollower}>
            <Text style={styles.followers}>
              {props.followers}
              <Text style={styles.txtFollower}> followers</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFollowing}>
            <Text style={styles.txtNumberFollow}>
              {props.following}
              <Text style={styles.txtFollower}> following</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.interested}>Interested in:</Text>
        <View style={styles.tagStyle}>
          {props.interested.map(item => (
            <Text style={styles.txtInterested}>{item}</Text>
          ))}
        </View>
        <TouchableOpacity style={[styles.arrDown]}>
          <SvgArrDown />
        </TouchableOpacity>
      </View>
      <View style={styles.activity}>
        <Text style={styles.txtActivity}>ACTIVITY</Text>
      </View>
    </View>
  );
});

export default HeaderPeopleProfile;

const styles = StyleSheet.create({
  headerProfile: {
    backgroundColor: '#FFF',
  },
  coverImage: {
    width: width_screen,
    height: 0.31 * height_screen,
    marginTop: '-0.1%',
  },
  linear: {
    width: width_screen,
    height: 0.31 * height_screen,
    position: 'absolute',
    opacity: 0.2,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 0, height: 4},
  },
  mask: {
    width: 0.87 * width_screen,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginTop: -0.06 * height_screen,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {width: 5, height: 10},
  },
  img: {
    width: 104,
    height: 104,
    borderRadius: 100,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    marginTop: -0.06 * height_screen,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  userName: {
    fontFamily: FONTS.Medium,
    fontSize: 16,
    color: '#353B48',
    marginTop: 16,
    marginBottom: 7,
    alignSelf: 'center',
  },
  address: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#7F8FA6',
    alignSelf: 'center',
  },
  inbox: {
    width: 110,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#7F8FA6',
    borderRadius: 100,
  },
  rewards: {
    width: 142,
    height: 40,
    backgroundColor: '#ED3269',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    height: 0.1 * height_screen,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F8FA',
  },
  txtInbox: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: '#7F8FA6',
  },
  txtRewards: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: '#FFF',
  },
  numberMessage: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#ED3269',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 6,
    top: -8,
  },
  txtNumberMessage: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: '#FFF',
  },
  followStyle: {
    marginTop: 30,
    flexDirection: 'row',
    marginLeft: 30,
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#353B48',
  },
  followers: {
    marginRight: 40,
  },
  txtFollower: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: '#7F8FA6',
  },
  txtNumberFollow: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#353B48',
  },
  interested: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: '#7F8FA6',
    marginLeft: 30,
    marginTop: 16,
  },
  tagStyle: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 8,
  },
  txtInterested: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
    marginRight: 8,
  },
  arrDown: {
    alignSelf: 'flex-end',
    marginRight: 24,
    bottom: 24,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  follow: {
    width: 110,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ED3269',
    borderRadius: 100,
  },
  txtFollow: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: '#ED3269',
  },
  activity: {
    width: width_screen,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ED3269',
  },
  txtActivity: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#ED3269',
  },
});
