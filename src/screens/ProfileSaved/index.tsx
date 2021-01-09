import React, {memo, useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import EventItem from 'components/EventItem';
import keyExtractor from 'ultis/keyExtractor';

const data = [
  {
    thumbnail: require('@assets/EventAroundU/around_u_2.png'),
    tag: ['#fashion', '#convention'],
    reviewTimes: 2.4,
    eventName: 'Bottled Art" Wine Painting Nigh',
    location: 'The Grand Connaught Rooms...',
    distance: 3.5,
    currentAttending: 2568,
    maxAttending: 10000,
    save: true,
  },
  {
    thumbnail: require('@assets/EventAroundU/around_u_1.png'),
    tag: ['#nightlife'],
    reviewTimes: 1.3,
    eventName: 'Quiet Clubbing VIP Heated Rooftop Party',
    location: '605 W 48th Street, Manhattan...',
    distance: 10,
    currentAttending: 2500,
    maxAttending: 10000,
    save: true,
  },
  {
    thumbnail: require('@assets/EventAroundU/around_u_3.png'),
    tag: ['#Fashion', '#Convention'],
    reviewTimes: 2.4,
    eventName: 'Mahogany Bridal Fair 2016',
    location: 'The Grand Connaught Rooms...',
    distance: 3.5,
    currentAttending: 2568,
    maxAttending: 10000,
    save: true,
  },
];

const ProfileSaved = memo(() => {
  const renderItem = useCallback(({item}) => {
    const {
      thumbnail,
      tag,
      reviewTimes,
      eventName,
      location,
      distance,
      currentAttending,
      maxAttending,
      save,
    } = item;
    return (
      <EventItem
        thumbnail={thumbnail}
        tag={tag}
        reviewTimes={reviewTimes}
        eventName={eventName}
        location={location}
        distance={distance}
        currentAttending={currentAttending}
        maxAttending={maxAttending}
        save={save}
      />
    );
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
});
export default ProfileSaved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
  },
  contentContainerStyle: {
    paddingTop: 14,
    paddingBottom: 20,
  },
});
