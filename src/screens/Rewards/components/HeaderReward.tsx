import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {height_screen, width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import Header from 'screens/PurchaseDetail/component/Header';
import {useNavigation} from '@react-navigation/native';

interface Props {
  amount: number;
}

const HeaderReward = memo((props: Props) => {
  const navigation = useNavigation();
  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <LinearGradient
      style={styles.linear}
      colors={['#F05F3E', '#ED3269']}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}>
      <Header title={'Reward'} onPress={onBack} />
      <Text style={styles.txtBalance}>Your credit balance is</Text>
      <View style={styles.amount}>
        <Text style={styles.dollarsIcon}>$</Text>
        <Text style={styles.txtAmount}>{props.amount || 15}</Text>
      </View>
    </LinearGradient>
  );
});
export default HeaderReward;
const styles = StyleSheet.create({
  linear: {
    height: 0.4 * height_screen,
  },
  txtBalance: {
    fontFamily: FONTS.Medium,
    fontSize: 16,
    color: '#fff',
    marginTop: 0.12 * height_screen,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  dollarsIcon: {
    fontFamily: FONTS.Regular,
    fontSize: 20,
    color: '#fff',
    marginTop: 0.022 * height_screen,
    marginRight: 0.03 * width_screen,
    marginLeft: 0.35 * width_screen,
  },
  txtAmount: {
    fontFamily: FONTS.Regular,
    fontSize: 80,
    color: '#fff',
  },
  amount: {
    flexDirection: 'row',
    marginTop: 0.01 * height_screen,
  },
});
