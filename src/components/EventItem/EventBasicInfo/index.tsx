import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Location from 'svgs/Location';
import TicketIcon from 'svgs/TicketIcon';
import FONTS from 'ultis/fonts';
import {width_screen} from 'ultis/dimensions';
import EventAttending from 'components/EventItem/EventAttending';
import SvgEventTime from 'svgs/EventDetail/SvgEventTime';
import {formatK} from 'help/formatNumber/formatK';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';

interface EventBasicInfoProps {
  location?: string;
  distance?: number;
  currentAttending: number;
  maxAttending: number;
  eventTime?: string;
  colorAttending?: string;
  isSmallItem?: boolean;
}

const EventBasicInfo = memo((props: EventBasicInfoProps) => {
  let color;
  let textAttending;
  if (props.currentAttending < props.maxAttending) {
    color = props.colorAttending ? props.colorAttending : '#7F8FA6';
    textAttending = `${formatK(props.currentAttending)}/${formatK(
      props.maxAttending,
    )} attending`;
  } else {
    color = '#ED3269';
    textAttending = 'Full list';
  }

  const colorTextLocation = props.colorAttending || '#7F8FA6';
  const textInfo = [styles.textLocation, {color: color}];
  const navigation = useNavigation();
  const onAttending = () => {
    navigation.navigate(ROUTES.ListAttending);
  };

  return (
    <View style={styles.container}>
      {props.location ? (
        <View style={styles.location}>
          <View style={styles.flexRow}>
            <Location />
            <Text style={[styles.textLocation, {color: colorTextLocation}]}>
              {props.location}
            </Text>
          </View>
          <Text style={[styles.textTag, {color: colorTextLocation}]}>
            {props.distance}km
          </Text>
        </View>
      ) : null}
      {props.eventTime ? (
        <View style={styles.location}>
          <View style={styles.flexRow}>
            <SvgEventTime />
            <Text style={[styles.textLocation, {color: colorTextLocation}]}>
              {props.eventTime}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.location}>
        <View style={styles.flexRow}>
          <TicketIcon />
          <TouchableOpacity onPress={onAttending}>
            <Text style={textInfo}>{textAttending}</Text>
          </TouchableOpacity>
        </View>
        <EventAttending location={props.location} />
      </View>
      <EventAttending eventTime={props.eventTime} />
    </View>
  );
});

export default EventBasicInfo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  location: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLocation: {
    marginLeft: 8,
    fontSize: 14,
    color: '#7F8FA6',
    fontFamily: FONTS.Regular,
  },
  textTag: {
    fontSize: 14,
    color: '#7F8FA6',
    marginRight: 8,
    fontFamily: FONTS.Regular,
  },
  avatar: {
    width: 18,
    height: 18,
    marginLeft: -8,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#F2F2F2',
  },
  bigAvatar: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderRadius: 32 / 2,
  },
});
