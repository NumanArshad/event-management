import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import keyExtractor from 'ultis/keyExtractor';
import {useNavigation} from '@react-navigation/native';
import ButtonLinear from 'components/buttons/ButtonLinear';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {width_screen} from 'ultis/dimensions';
import ROUTES from 'ultis/routes';
import HashtagItem from 'screens/SelectHashtag/components/HashtagItem';
import { adsVideoId } from 'data/ads';
import { AdMobInterstitial } from 'expo-ads-admob';

const data = [
  {
    source: require('assets/SelectHashtag/cinema.png'),
    title: '#cinema',
    des: '3.4K+ events',
  },
  {
    source: require('assets/SelectHashtag/festival.png'),
    title: '#festival',
    des: '800+ events',
  },
  {
    source: require('assets/SelectHashtag/food.png'),
    title: 'New York',
    des: 'USA',
  },
  {
    source: require('assets/SelectHashtag/japan.png'),
    title: 'Japan',
    des: 'Tokyo',
  },
  {
    source: require('assets/SelectHashtag/music.png'),
    title: '#music',
    des: '2K+ events',
  },
  {
    source: require('assets/SelectHashtag/newyork.png'),
    title: 'New York',
    des: 'USA',
  },
];

const SelectHashtag = memo(() => {
  const {navigate} = useNavigation();
  const onMaintab = useCallback(() => {
    // Display an interstitial
    AdMobInterstitial.setAdUnitID(adsVideoId);
    AdMobInterstitial.requestAdAsync().then(() => AdMobInterstitial.showAdAsync()).finally(() => {
      navigate(ROUTES.MainBottomTab);
    });
  }, []);

  const renderItem = useCallback(({item}) => {
    const {source, title, des} = item;
    return <HashtagItem source={source} title={title} des={des} />;
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
      <ButtonLinear
        title={`LET'S START!`}
        onPress={onMaintab}
        style={styles.btnNext}
      />
    </View>
  );
});

export default SelectHashtag;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  list: {
    paddingTop: 24,
  },

  btnNext: {
    position: 'absolute',
    bottom: getBottomSpace() + 8,
    width: width_screen - 48,
    height: 50,
    alignSelf: 'center',
    borderRadius: 100,
  },
});
