import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SvgTrain from 'svgs/Routes/SvgTrain';
import SvgArrowRight from 'svgs/EventDetail/SvgArrowRight';
import FONTS from 'ultis/fonts';
import {width_screen} from 'ultis/dimensions';
import {useNavigation} from '@react-navigation/native';
enum trafficType {
  train,
  taxi,
  drive,
  uber,
}
interface TrafficProps {
  endOfList?: boolean;
  trafficType: trafficType;
  nameTraffic: string;
  price: number[];
  estimateTime: string;
  onPress?: () => void;
}

const Traffic = memo((props: TrafficProps) => {
  let color: string;
  switch (props.trafficType) {
    case trafficType.train:
      color = '#ED3269';
      break;
    case trafficType.taxi:
      color = '#F5A623';
      break;
    case trafficType.drive:
      color = '#7F8FA6';
      break;
    case trafficType.uber:
      color = '#353B48';
      break;
  }
  let textPrice;
  if (props.price.length > 1) {
    textPrice = `$${props.price[0]} - $${props.price[1]}`;
  } else {
    textPrice = `$${props.price[0]}`;
  }

  const onMapDirection = useCallback(() => {
    props.onPress && props.onPress();
  }, []);

  return (
    <TouchableOpacity onPress={onMapDirection}>
      <View style={styles.container}>
        <View style={styles.traffic}>
          <Text style={[styles.textHeader, {color: '#353B48'}]}>
            {props.nameTraffic}
          </Text>
          <SvgTrain color={color} />
        </View>
        <View style={styles.price}>
          <Text style={[styles.textHeader, {color: '#ED3269'}]}>
            {textPrice}
          </Text>
          <Text style={styles.textEstimateTime}>{props.estimateTime}</Text>
        </View>
        <SvgArrowRight color={'#7F8FA6'} />
      </View>
      {!props.endOfList ? <View style={styles.line} /> : null}
    </TouchableOpacity>
  );
});

export default Traffic;

const styles = StyleSheet.create({
  container: {
    width: width_screen,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  traffic: {
    flex: 1,
  },
  price: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 8,
  },
  textHeader: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: FONTS.Medium,
    marginBottom: 7,
  },
  textEstimateTime: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: FONTS.Regular,
    color: '#353B48',
  },
  line: {
    width: width_screen - 48,
    height: 1,
    backgroundColor: '#F1F1F1',
    marginLeft: 24,
  },
});
