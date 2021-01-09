import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IconTime from 'svgs/IconTime';
import Location from 'svgs/Location';
import TicketIcon from 'svgs/TicketIcon';
import FONTS from 'ultis/fonts';

const BillTop = memo(() => {
  return (
    <View style={styles.bill}>
      <Text style={styles.textName}>
        Quiet Clubbing VIP Heated Rooftop Party
      </Text>

      <View style={styles.flexRow}>
        <IconTime />
        <Text style={styles.textInfo}>SUN, MAR. 25 - 6:30 PM until 7:30PM</Text>
      </View>

      <View style={styles.flexRow}>
        <Location />
        <View>
          <Text style={styles.textInfo}>Stage 48</Text>
          <Text style={[styles.textInfo, styles.textLocation]}>
            605 W 48th Street, Manhattan, New York 10036
          </Text>
        </View>
      </View>

      <View style={styles.flexRow}>
        <TicketIcon />
        <Text style={styles.textInfo}>2 Vip Tickets - $160</Text>
      </View>
      <View style={[styles.flexRow, styles.totalPriceView]}>
        <Text style={styles.textTotal}>Total price</Text>
        <Text style={styles.textPrice}>$160</Text>
      </View>
    </View>
  );
});

export default BillTop;

const styles = StyleSheet.create({
  textName: {
    fontSize: 18,
    fontFamily: FONTS.Medium,
    color: '#353B48',
  },

  flexRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  textInfo: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    lineHeight: 17,
    color: '#353B48',
    marginLeft: 8,
  },
  textLocation: {
    color: '#7F8FA6',
    marginTop: 8,
  },
  totalPriceView: {
    marginTop: 24,
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTotal: {
    fontSize: 18,
    fontFamily: FONTS.Regular,
    color: '#353B48',
  },
  textPrice: {
    fontSize: 18,
    fontFamily: FONTS.Medium,
    color: '#ED3269',
  },
  bill: {
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  billContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
