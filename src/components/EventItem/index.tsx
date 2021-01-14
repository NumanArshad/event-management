import React, {memo, useCallback, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconUnSave from 'svgs/IconUnSave';
import FONTS from 'ultis/fonts';
import HourGlass from 'svgs/HourGlass';
import {width_screen} from 'ultis/dimensions';
import EventName from 'components/EventItem/EventName';
import EventBasicInfo from 'components/EventItem/EventBasicInfo';
import ROUTES from 'ultis/routes';
import {useNavigation} from '@react-navigation/native';
import SvgSaved from 'svgs/IconSaved';

interface EventItemProps {
  thumbnail: any;
  tag?: string[];
  reviewTimes?: number;
  eventName: string;
  location: string;
  timeCountDown?: string; //time left for event in days hour minute second
  distance: number;
  currentAttending?: number;
  save: boolean;
  rate?: number;
  marginLeft?: number;
  onPress?: () => void;
  eventTime?: string;
  price?: number;
  colorAttending?: string;
  isSmallItem?: boolean;
}
const EventItem = memo((props: EventItemProps) => {
  const [isSave, setSave] = useState(props.save);
  const navigation = useNavigation();

  const onPressSave = useCallback(() => {
    setSave(!isSave);
  }, [isSave]);
  const thumbnailDimension = {
    width: props.isSmallItem ? '100%' : (327 / 375) * widthScreen,
    height: props.isSmallItem ? 220 * (375 / 327) * 0.7 : 220 * (375 / 327),
  };
  const countDownDimension = {
    width: props.isSmallItem ? '100%' : (327 / 375) * widthScreen,
    height: props.isSmallItem ? 34 * (375 / 327) * 0.7 : 34 * (375 / 327),
  };

  const data = {
    thumbnail: require("@assets/Trending/trending_1.png"),//props.thumbnail,
    tag: props.tag  || '',
    reviewTimes: props.reviewTimes  || '',
    eventName: props.eventName,
    location: props.location,
    timeCountDown: props.timeCountDown || '',
    distance: props.distance,
    currentAttending: props.currentAttending  || 0,
    //maxAttending: props.maxAttending  || '',
    rate: props.rate || 0,
    price: props.price || 0,
    save: props.save,
  };

  const onDetail = useCallback(() => {
    navigation.navigate(ROUTES.EventDetail, {
      data: data,
    });
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          marginLeft: props.marginLeft ? props.marginLeft : 0,
          width: props.isSmallItem ? width_screen * 0.7 : width_screen - 48,
        },
      ]}
      onPress={onDetail}
      activeOpacity={0.8}>
      <View style={styles.viewThumbnail}>
        <Image
          source={props.thumbnail}
          style={[styles.thumbnail, thumbnailDimension]}
        />
        <TouchableOpacity style={styles.iconUnSave} onPress={onPressSave}>
          {isSave ? <SvgSaved /> : <IconUnSave />}
        </TouchableOpacity>
        {props.timeCountDown ? (
          <View style={[styles.labelCountDown, countDownDimension]}>
            <HourGlass />
            <Text style={styles.textCountDown}>
              {props.timeCountDown}
            </Text>
          </View>
        ) : null}
      </View>
      <EventName
        tag={props.tag}
        eventName={props.eventName}
        rate={props.rate}
        reviewTimes={props.reviewTimes}
        isSmallItem={props.isSmallItem}
      />
      <EventBasicInfo
        currentAttending={props.currentAttending}
        location={props.location}
        distance={props.distance}
        eventTime={props.eventTime}
        isSmallItem={props.isSmallItem}
      />
    </TouchableOpacity>
  );
});

export default EventItem;
const widthScreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 36,
  },
  textReviewTimes: {
    fontSize: 14,
    color: '#353B48',
    marginLeft: 8,
    fontFamily: FONTS.Regular,
  },
  rateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTag: {
    fontSize: 14,
    color: '#7F8FA6',
    marginRight: 8,
    fontFamily: FONTS.Regular,
  },
  tagRateView: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  viewThumbnail: {
    alignItems: 'center',
  },
  thumbnail: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderRadius: 10,
  },
  iconUnSave: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
  textEventName: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    marginTop: 12,
    fontFamily: FONTS.Medium,
  },
  location: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  textLocation: {
    marginLeft: 8,
    fontSize: 14,
    color: '#7F8FA6',
    fontFamily: FONTS.Regular,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAttending: {
    flexDirection: 'row',
  },
  avatar: {
    width: 18,
    height: 18,
    marginLeft: -8,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#F2F2F2',
  },
  labelCountDown: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: 34 * (375 / 327),
    width: (327 / 375) * widthScreen,
    alignItems: 'center',
    backgroundColor: '#1DA1F2',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 16,
  },
  textCountDown: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: '#fff',
    marginLeft: 8,
  },
});
