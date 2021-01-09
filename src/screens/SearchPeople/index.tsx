import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBar from 'components/SearchBar';
import ListUser from 'screens/SearchPeople/components/ListUser';

const SearchPeople = memo(() => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar
        placeHolder={'Search People...'}
        onChangeText={setValue}
        onClear={setValue}
      />
      {value ? <ListUser textSearch={value} /> : null}
    </View>
  );
});

export default SearchPeople;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
