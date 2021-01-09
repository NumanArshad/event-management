import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import InactiveRate from 'components/inactiveRate';
import SvgWriteReview from 'svgs/EventDetail/SvgWriteReview';

interface RateDetailProps {
  marginTop?: number;
  rate: number;
  reviewTimes: number;
  numberReviews: number;
  onPress: () => void;
}

const RateDetail = memo((props: RateDetailProps) => {
  const marginTop = props.marginTop ? props.marginTop : 0;

  const onWriteReview = useCallback(() => {
    props.onPress();
  }, []);

  return (
    <View style={[styles.container, {marginTop: marginTop}]}>
      <View style={styles.flexRow}>
        <Text style={styles.textRate}>{props.rate}</Text>
        <View style={styles.reviewView}>
          <View style={styles.flexRow}>
            <InactiveRate rate={props.rate} />
            <Text style={[styles.textReviewTimes, {marginLeft: 8}]}>
              {props.reviewTimes}K
            </Text>
          </View>
          <Text style={styles.textReviewTimes}>
            {props.numberReviews} reviews
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.flexRow} onPress={onWriteReview}>
        <SvgWriteReview />
        <Text style={styles.textWrite}>Write review</Text>
      </TouchableOpacity>
    </View>
  );
});

export default RateDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8FA',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textRate: {
    fontSize: 40,
    color: '#ED3269',
    fontFamily: FONTS.Medium,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textReviewTimes: {
    fontSize: 14,
    color: '#353B48',
    fontFamily: FONTS.Regular,
  },
  reviewView: {
    marginLeft: 8,
  },
  textWrite: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: '#ED3269',
    marginLeft: 8,
  },
});
