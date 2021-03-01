import React, { memo, useCallback, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { width_screen } from "ultis/dimensions";
import FONTS from "ultis/fonts";
import InactiveRate from "components/inactiveRate";
import SvgWriteReview from "svgs/EventDetail/SvgWriteReview";
import { useDispatch, useSelector } from "react-redux";
import { getEventAllReviews } from "redux/reviews/reviews.actions";
import Color from "ultis/color";
interface RateDetailProps {
  eventId: number;
  marginTop?: number;
  rate: number;
  onPress: () => void;
}

const RateDetail = (props: RateDetailProps) => {
  const marginTop = props.marginTop ? props.marginTop : 0;

  const dispatch = useDispatch();

  const { all_reviews } = useSelector<any, any>((state) => state.reviews);

  useEffect(() => {
    dispatch(getEventAllReviews(props.eventId));
  }, [dispatch]);

  const onWriteReview = useCallback(() => {
    props.onPress();
  }, []);

  return (
    <View style={[styles.container, { marginTop: marginTop }]}>
      <View style={styles.flexRow}>
        <Text style={styles.textRate}>{props.rate}</Text>
        <View style={styles.reviewView}>
          <View style={styles.flexRow}>
            <InactiveRate rate={props.rate} />
            {/* <Text style={[styles.textReviewTimes, { marginLeft: 8 }]}>
              {props.reviewTimes}K
            </Text> */}
          </View>
          <Text style={styles.textReviewTimes}>
            {all_reviews?.length || 0} review{all_reviews?.length > 1 && `s`}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.flexRow} onPress={onWriteReview}>
        <SvgWriteReview />
        <Text style={styles.textWrite}>Write review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RateDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F8FA",
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textRate: {
    fontSize: 40,
    color: Color.GRAD_COLOR_3,
    fontFamily: FONTS.Medium,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  textReviewTimes: {
    fontSize: 14,
    color: Color.GRAD_COLOR_3,
    fontFamily: FONTS.Regular,
  },
  reviewView: {
    marginLeft: 8,
  },
  textWrite: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: Color.GRAD_COLOR_3,
    marginLeft: 8,
  },
});
