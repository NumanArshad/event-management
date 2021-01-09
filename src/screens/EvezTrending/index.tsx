import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';
import ButtonFilter from 'components/buttons/ButtonFilter';
import EventItem from 'components/EventItem';
import keyExtractor from 'ultis/keyExtractor';

const data = [
  {
    thumbnail: require('@assets/Trending/trending_1.png'),
    tag: ['#culture'],
    reviewTimes: 1.2,
    eventName: 'Sculpture Without Sight Experience',
    location: '812 Thatcher Court Yonkers…',
    distance: 4,
    currentAttending: 19,
    maxAttending: 5000,
    save: false,
    rate: 4.5,
  },
  {
    thumbnail: require('@assets/Trending/trending_2.png'),
    tag: ['#fashion'],
    reviewTimes: 2.4,
    eventName: 'Mahogany Bridal Fair 2018',
    location: 'The Grand Connaught Rooms…',
    distance: 2.5,
    currentAttending: 2568,
    maxAttending: 10000,
    save: false,
    rate: 4.5,
  },
  {
    thumbnail: require('@assets/Trending/trending_3.png'),
    tag: ['#Fashion', '#Convention'],
    reviewTimes: 1.2,
    eventName: 'Mahogany Bridal Fair 2016',
    location: 'The Grand Connaught Rooms…',
    distance: 3.5,
    currentAttending: 2568,
    maxAttending: 5000,
    save: false,
    rate: 4.5,
    timeCountDown: '7 Days 06 Hours 27 Mins 44 secs',
  },
];

const EvezTrending = memo(() => {
  const navigation = useNavigation();
  const onPressFilter = useCallback(() => {
    navigation.navigate(ROUTES.FilterEvez);
  }, [navigation]);
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
        style={styles.scroll}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <ButtonFilter onPress={onPressFilter} />
    </View>
  );
});

export default EvezTrending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
  },
  scroll: {
    width: '100%',
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
});
