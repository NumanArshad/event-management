import React, {memo, useCallback} from 'react';
import SvgTopBill from 'svgs/PurchaseDetail/SvgTopBill';
import {StyleSheet, View} from 'react-native';
import BillTop from 'screens/PurchaseDetail/component/BillTop';
import PaymentOption from 'screens/PurchaseDetail/component/PaymentOption';
import {height_screen, width_screen} from 'ultis/dimensions';

interface BillWithoutQRProps {
  onGetIt: () => void;
}

const BillWithoutQR = memo((props: BillWithoutQRProps) => {
  const onPress = useCallback(() => {
    props.onGetIt();
  }, []);
  //console.log('height_screen', height_screen);
  return (
    <View style={styles.container}>
      <View style={[styles.bill, {marginTop: height_screen > 812 ? 118 : 36}]}>
        <SvgTopBill>
          <BillTop />
        </SvgTopBill>
      </View>
      <PaymentOption onGetIt={onPress} />
    </View>
  );
});

export default BillWithoutQR;

const styles = StyleSheet.create({
  bill: {
    alignItems: 'center',
    marginBottom: 24,
  },
  container: {
    flex: 1,
  },
});
