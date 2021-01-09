import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';

interface Props {
  img: any;
  userName: string;
  follower: string;
}

const TopHostItem = (props: Props) => {
  const navigation = useNavigation();
  const onPeopleProfile = useCallback(() => {
    navigation.navigate(ROUTES.PeopleProfile);
  }, [navigation]);

  return (
    <TouchableOpacity onPress={onPeopleProfile} style={styles.container}>
      <Image style={styles.img} source={props.img} />
      <Text style={styles.txtUserName}>{props.userName}</Text>
      <Text style={styles.txtFollower}>{props.follower} followers</Text>
    </TouchableOpacity>
  );
};
export default TopHostItem;

const styles = StyleSheet.create({
  container: {
    marginLeft: 0.04 * width_screen,
    marginRight: 0.04 * width_screen,
  },
  img: {
    width: 0.38 * width_screen,
    height: 0.38 * width_screen,
  },
  txtUserName: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#353B48',
    marginTop: 16,
    marginBottom: 9,
    marginLeft: 8,
  },
  txtFollower: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#7F8FA6',
    marginLeft: 8,
  },
});
