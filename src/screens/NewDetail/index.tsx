import React, {memo, useCallback} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import EventItem from 'components/EventItem';
import NewsItem from 'screens/SearchNews/components/NewsItem';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SvgShare from 'svgs/SvgShare';
import Header from 'screens/PeopleProfile/components/Header';

const item = {
  imgEvent: require('assets/EvezNews/NewYork.png'),
  tag: ['#fashion', '#party'],
  event: 'Fashions Finest AW18\n' + 'During New York Fashion\n' + 'Week',
  time: 'MAR. 10, 2018',
  description1:
    'Fashions Finest one of the most ‘sought after\n' +
    'and popular show’ during London Fashion\n' +
    'Week will be back again for season 13 on 18 &\n' +
    '19 February 2017, following on from a fabulous\n' +
    'Season 12. \n' +
    '\n' +
    '\n' +
    'Not only are the Fashions Finest shows\n' +
    'renowned for discovering new talent and\n' +
    'giving opportunities to those that would not normally be able to afford to participate at\n' +
    'London Fashion Week but it attracts press,\n' +
    'buyers and fashionistas from around the \n' +
    'world who want to see the new trends that \n' +
    'are being developed by the designers that \n' +
    'Fashions Finest feature. \n' +
    'This season will end with our closing \n' +
    "competioron Britain's Top Designer season 5.'",
  description2:
    'Designers can apply to hire the space for a \n' +
    'individual show or showcase in a group show \n' +
    'or book a popup/exhibit.\n' +
    'They can also enter the competiton.\n' +
    '\n' +
    '\n' +
    'For mor information email: ',
  email: 'info@fashionsfinest.com',
};

const data = [
  {
    imgEvent: require('assets/EvezNews/Finest.png'),
    event: 'Fashions Finest\n' + 'AW17 During London\n' + 'Fashion Week',
    time: 'MAR. 10, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/Washington.png'),
    event: 'Washington Square\n' + 'Outdoor Art Exhibit',
    time: 'MAR. 20, 2018',
  },
  {
    imgEvent: require('assets/EvezNews/LasVegas.png'),
    event: 'Why Las Vegas Hotel\n' + 'Rooms For You',
    time: 'MAR. 15, 2018',
  },
];
const NewDetail = memo(() => {
  const scrollY = new Animated.Value(0);
  const onShare = useCallback(() => {}, []);
  return (
    <View style={styles.container}>
      <Header
        svgGoBack={true}
        onPress={onShare}
        svg={<SvgShare />}
        scrollY={scrollY}
        title={item.event}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        style={{zIndex: 10}}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {y: scrollY}},
          },
        ])}
        bounces={false}>
        <Image style={styles.imgEvent} source={item.imgEvent} />
        <View style={styles.tag}>
          {item.tag.map((item, index) => (
            <Text style={styles.txtTag} key={index}>
              {item}
            </Text>
          ))}
        </View>
        <Text style={styles.txtEvent}>{item.event}</Text>
        <Text style={styles.txtTime}>{item.time}</Text>
        <Text style={styles.description}>{item.description1}</Text>
        <View style={styles.eventItem}>
          <EventItem
            thumbnail={require('@assets/EventAroundU/around_u_2.png')}
            tag={['#fashion', '#convention']}
            reviewTimes={2.4}
            eventName={'Bottled Art" Wine Painting Nigh'}
            location={'The Grand Connaught Rooms...'}
            distance={3.5}
            currentAttending={2568}
            maxAttending={10000}
            save={true}
            rate={4.5}
            timeCountDown={'7 Days 06 Hours 27 Mins 44 secs'}
            price={0}
          />
        </View>
        <Text style={styles.description2}>{item.description2}</Text>
        <Text style={styles.txtEmail}>{item.email}</Text>
        <Text style={styles.similarNews}>SIMILAR NEWS</Text>
        {data.map((item, index) => (
          <NewsItem
            imgEvent={item.imgEvent}
            event={item.event}
            time={item.time}
            key={index}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
});

export default NewDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginBottom: getBottomSpace(),
  },
  imgEvent: {
    width: width_screen,
  },
  tag: {
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 24,
    marginLeft: 24,
  },
  txtTag: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#7F8FA6',
  },
  txtEvent: {
    fontFamily: FONTS.Medium,
    fontSize: 24,
    color: '#353B48',
    marginTop: 8,
    marginLeft: 24,
  },
  txtTime: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: '#7F8FA6',
    marginTop: 8,
    marginLeft: 24,
  },
  description: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
  },
  description2: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  eventItem: {
    backgroundColor: '#F7F8FA',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  txtEmail: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#ED3269',
    paddingHorizontal: 24,
    marginTop: 4,
  },
  similarNews: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#7F8FA6',
    marginLeft: 24,
    marginTop: 32,
  },
});
