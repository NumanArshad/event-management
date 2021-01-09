import React, {memo, useCallback, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Header from 'screens/PurchaseDetail/component/Header';
import BillWithoutQR from 'screens/PurchaseDetail/component/BillWithoutQR';
import BillWithQR from 'screens/PurchaseDetail/component/BillWithQR';
import {Transitioning, Transition} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {height_screen} from 'ultis/dimensions';
import ThemeUtils from 'ultis/themeUtils';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const PurchaseDetail = memo(() => {
  const transition = (
    <Transition.Sequence>
      <Transition.Out type="slide-bottom" />
      <Transition.Change interpolation="easeInOut" />
      <Transition.In type="slide-bottom" />
    </Transition.Sequence>
  );
  const ref = useRef();
  const navigation = useNavigation();

  const [isShow, setShow] = useState(false);
  const onPress = useCallback(() => {
    // @ts-ignore
    ref.current.animateNextTransition();
    setShow(!isShow);
  }, [isShow]);
  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  // @ts-ignore
  return (
      <LinearGradient colors={['#F05F3E', '#ED3269']} style={{flex: 1}}>
        <Header title={'Purchase Detail'} onPress={onBack} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Transitioning.View
            // @ts-ignore
            ref={ref}
            transition={transition}
            style={styles.orderDetail}>
            {isShow ? <BillWithQR /> : <BillWithoutQR onGetIt={onPress} />}
          </Transitioning.View>
        </ScrollView>
      </LinearGradient>
  );
});

export default PurchaseDetail;

const styles = StyleSheet.create({
  orderDetail: {
    flex: 1,
  },
});
