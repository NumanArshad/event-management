import React, {memo, useCallback} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import keyExtractor from 'ultis/keyExtractor';
import NewsItem from 'screens/SearchNews/components/NewsItem';
import HeaderEvezNew from 'screens/EvezNews/components/HeaderEvezNew';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';
import Header from 'screens/PeopleProfile/components/Header';
import SvgSearch from 'svgs/EvezNews/SvgSearch';
import { adsBannerId } from 'data/ads';
import { AdMobBanner } from 'expo-ads-admob';

const data = [
  {
    imgEvent: require('assets/EvezNews/Finest.png'),
    event: 'Fashions Finest\n' + 'AW17 During London\n' + 'Fashion Week',
    time: 'MAR. 10, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Bike.png'),
    event: 'Bike New York for\n' + 'Bike Month',
    time: 'MAR. 24, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Washington.png'),
    event: 'Washington Square\n' + 'Outdoor Art Exhibit',
    time: 'MAR. 20, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/LasVegas.png'),
    event: 'Why Las Vegas Hotel\n' + 'Rooms For You',
    time: 'MAR. 15, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Finest.png'),
    event: 'The 1968 Fashion\n' + 'Show, the History\n' + 'Lesson Melania…',
    time: 'MAR. 7, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Finest.png'),
    event: 'Fashions Finest\n' + 'AW17 During London\n' + 'Fashion Week',
    time: 'MAR. 10, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Bike.png'),
    event: 'Bike New York for\n' + 'Bike Month',
    time: 'MAR. 24, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Washington.png'),
    event: 'Washington Square\n' + 'Outdoor Art Exhibit',
    time: 'MAR. 20, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/LasVegas.png'),
    event: 'Why Las Vegas Hotel\n' + 'Rooms For You',
    time: 'MAR. 15, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Finest.png'),
    event: 'The 1968 Fashion\n' + 'Show, the History\n' + 'Lesson Melania…',
    time: 'MAR. 7, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Finest.png'),
    event: 'Fashions Finest\n' + 'AW17 During London\n' + 'Fashion Week',
    time: 'MAR. 10, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Bike.png'),
    event: 'Bike New York for\n' + 'Bike Month',
    time: 'MAR. 24, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Washington.png'),
    event: 'Washington Square\n' + 'Outdoor Art Exhibit',
    time: 'MAR. 20, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/LasVegas.png'),
    event: 'Why Las Vegas Hotel\n' + 'Rooms For You',
    time: 'MAR. 15, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Finest.png'),
    event: 'The 1968 Fashion\n' + 'Show, the History\n' + 'Lesson Melania…',
    time: 'MAR. 7, 2018',
  },
];

const EvezNews = memo(() => {
  const navigation = useNavigation();
  const onNewDetail = useCallback(() => {
    navigation.navigate(ROUTES.NewDetail);
  }, [navigation]);
  const onSearchNews = useCallback(() => {
    navigation.navigate(ROUTES.SearchNews);
  }, [navigation]);
  const renderItem = useCallback(
    ({item}) => {
      const {imgEvent, event, time} = item;
      return (
        <TouchableOpacity onPress={onNewDetail}>
          <NewsItem imgEvent={imgEvent} event={event} time={time} />
        </TouchableOpacity>
      );
    },
    [onNewDetail],
  );
  const headerList = useCallback(() => <HeaderEvezNew />, []);
  const scrollY = new Animated.Value(0);
  return (
    <View style={styles.container}>
      <Header onPress={onSearchNews} svg={<SvgSearch />} scrollY={scrollY} />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        style={{zIndex: 10}}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {y: scrollY}},
          },
        ])}
        bounces={false}>
        <FlatList
          ListHeaderComponent={headerList}
          style={styles.container}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </Animated.ScrollView>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID={adsBannerId}
        onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
});

export default EvezNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
