import React, {memo, useCallback, useRef} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Page from 'screens/Walkthrough/components/Page';
import {height_screen, width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import SvgIconFb from 'svgs/Walkthrough/SvgIconFb';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SvgIconTwitter from 'svgs/Walkthrough/SvgIconTwitter';
import Dots from 'screens/Walkthrough/components/Dots';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';

const data = [
  {
    source: require('assets/Walkthrough/bg.png'),
    title: 'EVENTS COLLECTION',
    des: 'Discover the best things to do this\n' + 'week in your city',
  },
  {
    source: require('assets/Walkthrough/bg1.png'),
    title: 'CONNECT & FOLLOW',
    des:
      'Connect with your friends, follow tastemakers\n' +
      'and people who share your interests.',
  },
  {
    source: require('assets/Walkthrough/bg2.png'),
    title: 'BOOK & SHARE',
    des:
      'Book events so easy in two step and share it\n' + 'with your friends.',
  },
];

const Walkthrough = memo(() => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {navigate} = useNavigation();
  const onFb = useCallback(() => {
    navigate(ROUTES.SelectCity);
  }, [navigate]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEventThrottle={16}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {data.map((item, index) => {
          return (
            <Page
              source={item.source}
              title={item.title}
              des={item.des}
              key={index}
            />
          );
        })}
      </ScrollView>
      <Text style={styles.note}>
        Make the best experience with your friend in
      </Text>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.btnFb} onPress={onFb}>
          <SvgIconFb />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTwitter}>
          <SvgIconTwitter />
        </TouchableOpacity>
      </View>

      <Dots scrollX={scrollX} />
    </View>
  );
});

export default Walkthrough;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    width: width_screen * 3,
    height: height_screen,
  },
  note: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: '#FFF',
    position: 'absolute',
    bottom: height_screen * 0.17,
    alignSelf: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: getBottomSpace() + 32,
    flexDirection: 'row',
    paddingHorizontal: width_screen * 0.064,
    justifyContent: 'space-between',
  },
  btnFb: {
    width: width_screen * 0.41,
    height: 50,
    backgroundColor: '#3B5998',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTwitter: {
    width: width_screen * 0.41,
    height: 50,
    backgroundColor: '#1DA1F2',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
