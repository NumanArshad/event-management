import React, {memo, useCallback, useEffect, useState} from 'react';
import {width_screen} from 'ultis/dimensions';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FONTS from 'ultis/fonts';
import {LinearGradient} from 'expo-linear-gradient';
import SvgCheck from 'svgs/SvgCheck';

interface Props {
  id: string;
  source: any;
  title: string;
  des: string;
  isCheck: string;
  onPress: (id: string) => void;
}

const ItemCity = memo((props: Props) => {
  const [choose, setChoose] = useState(false);
  const {id, source, title, des, isCheck, onPress} = props;
  const onChosse = useCallback(() => {
    onPress && onPress(id);
  }, [id, onPress]);
  useEffect(() => {
    if (id === isCheck) {
      setChoose(true);
    } else {
      setChoose(false);
    }
  }, [id, isCheck]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.75}
      onPress={onChosse}>
      <Image source={source} style={styles.img} />
      <Text style={[styles.title, {color: choose ? '#ED3269' : '#353B48'}]}>
        {title}
      </Text>
      <Text style={styles.des}>{des}</Text>
      {choose && (
        <LinearGradient
          style={styles.block}
          colors={['#ED3269', '#F05F3E']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
        />
      )}
      {choose && (
        <View style={styles.containerCheck}>
          <SvgCheck />
        </View>
      )}
    </TouchableOpacity>
  );
});

export default ItemCity;

const styles = StyleSheet.create({
  container: {
    width: (width_screen - 72) / 2,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 32,
  },
  img: {
    width: (width_screen - 72) / 2,
    height: (width_screen - 72) * 0.67,
    borderRadius: 10,
  },
  title: {
    color: '#353B48',
    fontSize: 16,
    fontFamily: FONTS.Medium,
    marginTop: 16,
  },
  des: {
    color: '#7F8FA6',
    fontSize: 12,
    fontFamily: FONTS.Regular,
  },
  block: {
    width: (width_screen - 72) / 2,
    height: (width_screen - 72) * 0.67,
    borderRadius: 10,
    position: 'absolute',
    opacity: 0.6,
  },
  containerCheck: {
    width: (width_screen - 72) / 2,
    height: (width_screen - 72) * 0.67,
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
