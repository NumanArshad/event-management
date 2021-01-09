import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBar from 'components/SearchBar';
import ListEvent from 'screens/TabSearchEvents/components/ListEvent';
import ListHotKeysNews from 'screens/SearchNews/components/ListHotKeysNews';
import { adsBannerId } from 'data/ads';
import { AdMobBanner } from 'expo-ads-admob';

const TabSearchEvents = memo(() => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.container}>
      <SearchBar
        placeHolder={'Search Events...'}
        onChangeText={setValue}
        onClear={setValue}
      />
      {!value ? <ListHotKeysNews /> : <ListEvent textSearch={value} />}
      <AdMobBanner
        adSize="fullBanner"
        adUnitID={adsBannerId}
        onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
});

export default TabSearchEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
