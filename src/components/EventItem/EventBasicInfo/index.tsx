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
import dayjs, { Dayjs } from "dayjs";
import CustomSkeleton from "components/SkeletonPlaceholder";

interface EventBasicInfoProps {
  eventId?: number;
  location?: string;
  distance?: string;
  currentAttending?: number;
  //maxAttending?: number;
  eventDateTime?:  string;
  colorAttending?: string;
  isSmallItem?: boolean;
  loadFlag?:boolean
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

  const {latitude, longitude} =  splitLatLongStr(props?.distance) || {}

  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <View style={styles.flexRow}>
          {props.location ? <Location /> : null}
          <CustomSkeleton style={[styles.textLocation, { width: width_screen * 0.55, height: 15 }]}
          loadFlag={props.loadFlag}>
            <Text style={[styles.textLocation, { color: colorTextLocation }]}>
              {props.location}
            </Text>
          </CustomSkeleton>
        </View>
        <CustomSkeleton style={[styles.textTag, {  width: width_screen * 0.20, height: 10 }]}
        loadFlag={props.loadFlag}>
        <Text style={[styles.textTag, { color: colorTextLocation }]}>
          {getDistanceByLatLong(latitude, longitude)} km
        </Text>
        </CustomSkeleton>
      
      </View>

      <View style={styles.location}>
        <View style={styles.flexRow}>
          {props.eventDateTime ? <SvgEventTime /> : null}
          <CustomSkeleton style={[styles.textLocation, { width: width_screen * 0.45, height: 10 }]}
          loadFlag={props.loadFlag}>
            <Text style={[styles.textLocation, { color: colorTextLocation }]}>
              {props.eventDateTime}
            </Text>
          </CustomSkeleton>
        </View>
      </View>

        <View style={styles.location} onTouchStart={onAttending}>
          <View style={styles.flexRow}>
            {props.currentAttending ? <TicketIcon /> : null}
            <CustomSkeleton loadFlag={props.loadFlag}>
            <Text style={[styles.textLocation, { color: colorTextLocation }]}>
              {props.currentAttending} {props.currentAttending && `Attendees`}
            </Text>
            </CustomSkeleton>
          
          </View>
        </View>
    
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
