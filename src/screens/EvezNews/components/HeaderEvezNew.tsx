import React, {memo, useCallback, useRef} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Dots from 'screens/Walkthrough/components/Dots';
import {width_screen} from 'ultis/dimensions';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';

const dataImg = [
  {
    img: require('assets/EvezNews/NewYork.png'),
  },
  {
    img: require('assets/EvezNews/NewYork.png'),
  },
  {
    img: require('assets/EvezNews/NewYork.png'),
  },
];

const HeaderEvezNew = memo(() => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const onNewDetail = useCallback(() => {
    navigation.navigate(ROUTES.NewDetail);
  }, [navigation]);
  return (
    <View style={styles.scrollViewStyle}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {x: scrollX}}},
        ])}
        scrollEventThrottle={16}>
        {dataImg.map((item, index) => {
          return (
            <TouchableOpacity onPress={onNewDetail} activeOpacity={0.8}>
              <Image style={styles.img} source={item.img} key={index} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Dots scrollX={scrollX} style={styles.dots} />
    </View>
  );
});
export default HeaderEvezNew;
const styles = StyleSheet.create({
  scrollViewStyle: {
    height: 252,
    width: '100%',
  },
  img: {
    width: width_screen,
  },
  indicatorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    bottom: 16,
  },
});
