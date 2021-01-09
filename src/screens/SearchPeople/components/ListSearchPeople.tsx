import React, {memo, useCallback} from 'react';
import {TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import FONTS from 'ultis/fonts';
import keyExtractor from 'ultis/keyExtractor';
const data = [
  'Alison',
  'Jennie Watson',
  'Linnie Jennings',
  'Charlotte Gregory',
  'Lilly Mullins',
  'Jean Grant',
];
const ListSearchPeople = memo(() => {
  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity style={styles.btnUser}>
        <Text style={styles.txtUser}>{item}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList
      style={styles.listUser}
      renderItem={renderItem}
      data={data}
      keyExtractor={keyExtractor}
    />
  );
});

export default ListSearchPeople;

const styles = StyleSheet.create({
  listUser: {
    paddingLeft: 24,
    flex: 1,
  },
  btnUser: {
    height: 50,
    justifyContent: 'center',
  },
  txtUser: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
  },
});
