import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import keyExtractor from 'ultis/keyExtractor';
import UserItem from 'components/UserItem';
import FONTS from 'ultis/fonts';

const data = [
  {
    image: require('assets/Followers/img.jpg'),
    name: 'Alison Bawdekar',
    numberFollower: '34K',
  },
  {
    image: require('assets/Followers/img.jpg'),
    name: 'Alison Ruocco',
    numberFollower: '117',
  },
  {
    image: require('assets/Followers/img.jpg'),
    name: 'Alison Knowles',
    numberFollower: '940',
  },
  {
    image: require('assets/Followers/img.jpg'),
    name: 'Alison Ruocco',
    numberFollower: '22K',
  },
  {
    image: require('assets/Followers/img.jpg'),
    name: 'Alison Roteman',
    numberFollower: '736',
  },
  {
    image: require('assets/Followers/img.jpg'),
    name: 'Alison Poma',
    numberFollower: '284',
  },
  {
    image: require('assets/Followers/img.jpg'),
    name: 'Alison Niezen',
    numberFollower: '22K',
  },
];
interface Props {
  textSearch: string;
}
const ListUser = memo((props: Props) => {
  const renderItem = useCallback(({item}) => {
    const {image, name, numberFollower} = item;
    return (
      <UserItem image={image} name={name} numberFollower={numberFollower} />
    );
  }, []);
  const renderHeader = useCallback(
    () => (
      <Text style={styles.txtHeader}>
        245 results for “{props.textSearch}” in New York
      </Text>
    ),
    [props.textSearch],
  );
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={renderHeader}
    />
  );
});

export default ListUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtHeader: {
    marginLeft: 24,
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: '#353B48',
    marginTop: 25,
  },
});
