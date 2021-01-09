import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {height_screen, width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';

interface Props {
  source: any;
  title: string;
  des: string;
}

const Page = memo((props: Props) => {
  return (
    <View style={styles.page}>
      <Image source={props.source} style={styles.image} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.des}>{props.des}</Text>
    </View>
  );
});

export default Page;

const styles = StyleSheet.create({
  page: {
    width: width_screen,
    height: height_screen,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: width_screen,
    height: '100%',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: FONTS.Medium,
    marginTop: height_screen * 0.53,
  },
  des: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: FONTS.Regular,
    textAlign: 'center',
    marginTop: 16,
  },
});
