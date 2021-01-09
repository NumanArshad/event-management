import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ActivityItem from 'screens/ProfileActivity/components/ActivityItem';
import keyExtractor from 'ultis/keyExtractor';
export enum TYPE_ACTIVITY {
  JOINED,
  BOUGHT,
}

const ProfileActivity = memo(() => {
  const renderItem = useCallback(({item}) => {
    const {typeActivity, time_Do_Activity, img, titlePost, timePost} = item;
    return (
      <ActivityItem
        typeActivity={typeActivity}
        time_Do_Activity={time_Do_Activity}
        img={img}
        titlePost={titlePost}
        timePost={timePost}
      />
    );
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataProfileActivity}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
});
export default ProfileActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
});

const dataProfileActivity = [
  {
    typeActivity: TYPE_ACTIVITY.JOINED,
    time_Do_Activity: '10 MINS AGO',
    img: require('assets/ProfileActivity/BottledArt.png'),
    titlePost: '"Bottled Art" Wine\n' + ' Painting Night',
    timePost: 'SUN, MAR. 25  -  4:30 PM EST',
  },
  {
    typeActivity: TYPE_ACTIVITY.BOUGHT,
    time_Do_Activity: 'MAR. 06, 2018',
    img: require('assets/ProfileActivity/AMC.png'),
    titlePost: 'AMC Black Ticket',
    timePost: 'SUN, MAR. 28  -  4:30 PM EST',
  },
  {
    typeActivity: TYPE_ACTIVITY.BOUGHT,
    time_Do_Activity: 'MAR. 03, 2018',
    img: require('assets/ProfileActivity/WWE.png'),
    titlePost: 'Win 2 tickets to WWE @\n' + ' MSG',
    timePost: 'SUN, MAR. 30  -  4:30 PM EST',
  },
  {
    typeActivity: TYPE_ACTIVITY.JOINED,
    time_Do_Activity: 'FEB. 25, 2018',
    img: require('assets/ProfileActivity/Wine.png'),
    titlePost: '"Bottled Art" Wine\n' + ' Painting Night',
    timePost: 'SUN, MAR. 28  -  4:30 PM EST',
  },
  {
    typeActivity: TYPE_ACTIVITY.BOUGHT,
    time_Do_Activity: 'JAN. 20, 2018',
    img: require('assets/ProfileActivity/MSG.png'),
    titlePost: 'Win 2 tickets to WWE @\n' + ' MSG',
    timePost: 'SUN, MAR. 30  -  4:30 PM EST',
  },
  {
    typeActivity: TYPE_ACTIVITY.JOINED,
    time_Do_Activity: '10 MINS AGO',
    img: require('assets/ProfileActivity/BottledArt.png'),
    titlePost: '"Bottled Art" Wine\n' + ' Painting Night',
    timePost: 'SUN, MAR. 25  -  4:30 PM EST',
  },
  {
    typeActivity: TYPE_ACTIVITY.BOUGHT,
    time_Do_Activity: 'MAR. 06, 2018',
    img: require('assets/ProfileActivity/AMC.png'),
    titlePost: 'AMC Black Ticket',
    timePost: 'SUN, MAR. 28  -  4:30 PM EST',
  },
  {
    typeActivity: TYPE_ACTIVITY.BOUGHT,
    time_Do_Activity: 'MAR. 03, 2018',
    img: require('assets/ProfileActivity/WWE.png'),
    titlePost: 'Win 2 tickets to WWE @\n' + ' MSG',
    timePost: 'SUN, MAR. 30  -  4:30 PM EST',
  },
  {
    typeActivity: TYPE_ACTIVITY.JOINED,
    time_Do_Activity: 'FEB. 25, 2018',
    img: require('assets/ProfileActivity/Wine.png'),
    titlePost: '"Bottled Art" Wine\n' + ' Painting Night',
    timePost: 'SUN, MAR. 28  -  4:30 PM EST',
  },
  {
    typeActivity: TYPE_ACTIVITY.BOUGHT,
    time_Do_Activity: 'JAN. 20, 2018',
    img: require('assets/ProfileActivity/MSG.png'),
    titlePost: 'Win 2 tickets to WWE @\n' + ' MSG',
    timePost: 'SUN, MAR. 30  -  4:30 PM EST',
  },
];
