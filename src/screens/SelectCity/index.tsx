import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBar from 'components/SearchBar';
import ListCity from 'screens/SelectCity/components/ListCity';
import ListSearch from 'screens/SelectCity/components/ListSearch';

const SelectCity = memo(() => {
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        placeHolder={'Search city...'}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {focus ? (
        <ListSearch />
      ) : (
        <>
          <ListCity />
        </>
      )}
    </View>
  );
});

export default SelectCity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
