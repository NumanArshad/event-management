import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FONTS from 'ultis/fonts';
import SvgBackground from 'svgs/PurchaseDetail/SvgBackGround';
import BillTop from 'screens/PurchaseDetail/component/BillTop';
import SvgSms from 'svgs/PurchaseDetail/SvgSms';
import SvgMail from 'svgs/PurchaseDetail/SvgMail';
import SvgFacebook from 'svgs/PurchaseDetail/SvgFacebook';
import SvgTwitter from 'svgs/PurchaseDetail/SvgTwitter';

const BillWithQR = memo(() => {
  return (
    <View style={styles.billContainer}>
      <SvgBackground>
        <BillTop />
        <View style={styles.qrCodeView}>
          <Image
            source={require('@assets/PurchaseDetail/img_qrcode.png')}
            style={styles.qrImage}
          />
          <Text style={styles.textHelp}>
            Check your email{' '}
            <Text style={[styles.textHelp, {color: '#ED3269'}]}>
              lehieuds@gmail.com{' '}
            </Text>
            in order to know how to get in the event.
          </Text>
          <View style={styles.flexRow}>
            <Text style={styles.textHelp}>Invite Friend:</Text>
            <SvgSms />
            <SvgMail />
            <SvgFacebook />
            <SvgTwitter />
          </View>
        </View>
      </SvgBackground>
    </View>
  );
});

export default BillWithQR;

const styles = StyleSheet.create({
  billContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
  },
  qrImage: {
    width: 144,
    height: 144,
  },
  qrCodeView: {
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  textHelp: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
    lineHeight: 24,
  },
  flexRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});
