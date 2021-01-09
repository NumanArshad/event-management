import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ItemCity from 'screens/SelectCity/components/ItemCity';
import keyExtractor from 'ultis/keyExtractor';
import ButtonLinear from 'components/buttons/ButtonLinear';
import ROUTES from 'ultis/routes';
import {useNavigation} from '@react-navigation/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {width_screen} from 'ultis/dimensions';

const data = [
  {
    id: '0',
    source: require('assets/SelectCity/london.png'),
    title: 'London',
    des: 'US',
  },
  {
    id: '1',

    source: require('assets/SelectCity/london.png'),
    title: 'London',
    des: 'US',
  },
  {
    id: '2',
    source: require('assets/SelectCity/newyork.png'),
    title: 'New York',
    des: 'USA',
  },
  {
    id: '3',
    source: require('assets/SelectCity/paris.png'),
    title: 'Paris',
    des: 'France',
  },
  {
    id: '4',
    source: require('assets/SelectCity/tokyo.png'),
    title: 'Tokyo',
    des: 'Japan',
  },
  {
    id: '5',
    source: require('assets/SelectCity/london.png'),
    title: 'London',
    des: 'US',
  },
];
const ListCity = memo(() => {
  const [isCheck, setCheck] = useState('');
  const onPress = useCallback((id: string) => {
    setCheck(id);
  }, []);
  const renderItem = useCallback(
    ({item}) => {
      const {source, title, des, id} = item;
      return (
        <ItemCity
          id={id}
          source={source}
          title={title}
          des={des}
          isCheck={isCheck}
          onPress={onPress}
        />
      );
    },
    [isCheck, onPress],
  );
  const {navigate} = useNavigation();
  const onHashtag = useCallback(() => {
    navigate(ROUTES.SelectHashtag);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
      />
      {isCheck ? (
        <ButtonLinear
          title={'NEXT'}
          onPress={onHashtag}
          style={styles.btnNext}
        />
      ) : null}
    </View>
  );
});

export default ListCity;

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
  btnNext: {
    position: 'absolute',
    bottom: getBottomSpace() + 8,
    width: width_screen - 48,
    height: 50,
    alignSelf: 'center',
    borderRadius: 100,
  },
});
