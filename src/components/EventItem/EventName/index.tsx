import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import FONTS from "ultis/fonts";
import { width_screen } from "ultis/dimensions";
import InactiveRate from "components/inactiveRate";
import CustomSkeleton from "components/SkeletonPlaceholder";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Color from "ultis/color";

interface EventNameProps {
  tag?: string;
  eventName: string;
  rate?: number;
 // reviewTimes?: number;
  isSmallItem?: boolean;
  loadFlag?: boolean;
}

// thumbnail={getImage(image)}
// tag={type_name}
// id={event_id}
// eventName={event_name}
// location={address}
// distance={lat_long}
// eventDateTime={formatDateTime(event_date, start_time)}
// rate={rating}
// duration={duration}
const EventName = memo((props: EventNameProps) => {
  const fontSizeTag = props.isSmallItem ? 12 : 14;
  const fontSizeName = props.isSmallItem ? 14 : 18;

  

  return (
    <View style={styles.container}>
      <View style={styles.tagRateView}>
        <CustomSkeleton
          style={[styles.textTag, { width: width_screen * 0.3, height: 15 }]}
          loadFlag={props.loadFlag}
        >
          {props?.tag &&
          <Text style={[styles.textTag, { fontSize: fontSizeTag }]}>
            # {props?.tag}
          </Text>}
        </CustomSkeleton>

        {props?.rate ? (
          <View style={styles.rateView}>
            <InactiveRate rate={props?.rate || 0} />
        
          </View>
        ) : null}
      </View>
      <CustomSkeleton
        style={[
          styles.textEventName,
          { width: width_screen * 0.5, height: 20 },
        ]}
      >
        <Text style={[styles.textEventName, { fontSize: fontSizeName }]}>
          {props?.eventName}
        </Text>
      </CustomSkeleton>
    </View>
  );
});

export default EventName;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  textTag: {
    color: "#7F8FA6",
    marginRight: 8,
    fontFamily: FONTS.Regular,
  },
  tagRateView: {
    flexDirection: "row",
    marginTop: 16,
    width: "100%",
    justifyContent: "space-between",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textEventName: {
    lineHeight: 27,
    marginTop: 12,
    fontFamily: FONTS.Medium,
  },
  rateView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textReviewTimes: {
    color: Color.GRAD_COLOR_3,
    marginLeft: 8,
    fontFamily: FONTS.Regular,
  },
});
