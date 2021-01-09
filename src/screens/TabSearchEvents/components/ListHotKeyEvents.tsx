import React, {memo, useCallback} from 'react';
import {TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import FONTS from 'ultis/fonts';
import keyExtractor from 'ultis/keyExtractor';
const data = ['oscar', 'new york fashion show', 'night party', 'lux bar party'];

const ListHotKeyEvents = memo(() => {
  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity style={styles.btnEvent}>
        <Text style={styles.txtEvent}>{item}</Text>
      </TouchableOpacity>
    );
  }, []);
  const headerList = useCallback(
    () => <Text style={styles.txtHotKeys}>HOT KEYS</Text>,
    [],
  );
  return (
    <FlatList
      style={styles.listEvent}
      renderItem={renderItem}
      data={data}
      keyExtractor={keyExtractor}
      ListHeaderComponent={headerList}
    />
  );
});

export default ListHotKeyEvents;

const styles = StyleSheet.create({
  listEvent: {
    paddingLeft: 24,
    flex: 1,
  },
  btnEvent: {
    height: 50,
    justifyContent: 'center',
  },
  txtEvent: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
  },
  txtHotKeys: {
    fontSize: 14,
    color: '#7F8FA6',
    fontFamily: FONTS.Medium,
    marginTop: 40,
    marginBottom: 20,
  },
});
