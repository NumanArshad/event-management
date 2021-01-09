import React, {memo, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import SvgLocation from 'svgs/SvgLocation';
import FONTS from 'ultis/fonts';
import keyExtractor from 'ultis/keyExtractor';
import ButtonLinear from 'components/buttons/ButtonLinear';
import {width_screen} from 'ultis/dimensions';
const data = [
  'Atlanta, GA',
  'Chicago, IL',
  'San Francisco, CA',
  'Atlanta, GA',
  'Chicago, IL',
  'San Francisco, CA',
];
const ListSearch = memo(() => {
  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity style={styles.btnCity}>
        <Text style={styles.txtCity}>{item}</Text>
      </TouchableOpacity>
    );
  }, []);
  const headerList = useCallback(
    () => (
      <>
        <TouchableOpacity style={styles.btnLocation}>
          <SvgLocation />
          <Text style={styles.txtLocation}>Use your current location</Text>
        </TouchableOpacity>
        <Text style={styles.txtPopular}>POPULAR CITIES</Text>
      </>
    ),
    [],
  );
  if (data.length === 0) {
    return (
      <View style={styles.containerEmpty}>
        <Image source={require('assets/SelectCity/img_art_search.png')} />
        <Text style={styles.txtEmpty1}>
          We could’nt find that city, try other one
        </Text>
        <Image source={require('assets/SelectCity/Or.png')} />
        <Text style={styles.txtEmpty2}>Do you want to request a new city?</Text>
        <ButtonLinear title={'REQUEST'} style={styles.btnRequest} />
      </View>
    );
  }
  return (
    <FlatList
      style={styles.listCity}
      renderItem={renderItem}
      data={data}
      keyExtractor={keyExtractor}
      ListHeaderComponent={headerList}
    />
  );
});

export default ListSearch;

const styles = StyleSheet.create({
  btnLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  txtLocation: {
    fontSize: 14,
    color: '#ED3269',
    fontFamily: FONTS.Regular,
    marginLeft: 16,
  },
  txtPopular: {
    fontSize: 14,
    color: '#7F8FA6',
    fontFamily: FONTS.Medium,
    marginTop: 40,
    marginBottom: 20,
  },
  listCity: {
    paddingLeft: 24,
    flex: 1,
  },
  btnCity: {
    height: 50,
    justifyContent: 'center',
  },
  txtCity: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
  },
  containerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150,
  },
  txtEmpty1: {
    fontSize: 12,
    color: '#353B48',
    fontFamily: FONTS.Regular,
    marginTop: 40,
    marginBottom: 30,
  },
  txtEmpty2: {
    fontSize: 12,
    color: '#353B48',
    fontFamily: FONTS.Regular,
    marginTop: 30,
  },
  btnRequest: {
    width: width_screen * 0.57,
    height: 50,
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 25,
  },
});
