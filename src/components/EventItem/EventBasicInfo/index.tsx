import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Location from "svgs/Location";
import TicketIcon from "svgs/TicketIcon";
import FONTS from "ultis/fonts";
import { width_screen } from "ultis/dimensions";
import EventAttending from "components/EventItem/EventAttending";
import SvgEventTime from "svgs/EventDetail/SvgEventTime";
import { formatK } from "help/formatNumber/formatK";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import isEmpty from "ultis/isEmpty";
import { getDistanceByLatLong, splitLatLongStr } from "ultis/functions";

interface EventBasicInfoProps {
  eventId?: number;
  location?: string;
  distance?: string;
  currentAttending?: number;
  //maxAttending?: number;
  eventTime?: string;
  colorAttending?: string;
  isSmallItem?: boolean;
}

const EventBasicInfo = memo((props: EventBasicInfoProps) => {
  let color;
 
  const colorTextLocation = props.colorAttending || "#7F8FA6";
  const textInfo = [styles.textLocation, { color: color }];
  const navigation = useNavigation();
  const onAttending = () => {
    navigation.navigate(ROUTES.ListAttending,{
      eventId: props.eventId
    });
  };

  console.log("id is", props.eventId)

  const {latitude, longitude} =  splitLatLongStr(props?.distance) || {}

  return (
    <View style={styles.container}>
      {props.location ? (
        <View style={styles.location}>
          <View style={styles.flexRow}>
            <Location />
            <Text style={[styles.textLocation, { color: colorTextLocation }]}>
              {props.location}
            </Text>
          </View>
          <Text style={[styles.textTag, { color: colorTextLocation }]}>
            {getDistanceByLatLong(latitude, longitude)} km
          </Text>
        </View>
      ) : null}
      {props.eventTime ? (
        <View style={styles.location}>
          <View style={styles.flexRow}>
            <SvgEventTime />
            <Text style={[styles.textLocation, { color: colorTextLocation }]}>
              {props.eventTime}
            </Text>
          </View>
        </View>
      ) : null}

      {props.currentAttending && (
        <View style={styles.location}
        onTouchStart={onAttending}>
          <View style={styles.flexRow}>
            <TicketIcon />
            <Text style={[styles.textLocation, { color: colorTextLocation }]}>
              {props.currentAttending} Attendees
            </Text>
          </View>
        </View>
      )}
    </View>
  );
});

export default EventBasicInfo;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  location: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textLocation: {
    marginLeft: 8,
    fontSize: 14,
    color: "#7F8FA6",
    fontFamily: FONTS.Regular,
  },
  textTag: {
    fontSize: 14,
    color: "#7F8FA6",
    marginRight: 8,
    fontFamily: FONTS.Regular,
  },
  avatar: {
    width: 18,
    height: 18,
    marginLeft: -8,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#F2F2F2",
  },
  bigAvatar: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderRadius: 32 / 2,
  },
});
