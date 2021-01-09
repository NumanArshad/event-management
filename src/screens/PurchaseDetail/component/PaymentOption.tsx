import React, {memo, useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PaymentMethod from 'screens/PurchaseDetail/component/PaymentMethod';
import ButtonLinear from 'components/buttons/ButtonLinear';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import FONTS from 'ultis/fonts';

interface PaymentOptionProps {
  onGetIt: () => void;
}

const PaymentOption = memo((props: PaymentOptionProps) => {
  const [isChoose, setChoose] = useState(1);

  const onApply = useCallback(() => {}, []);
  const onChoose = useCallback(index => {
    setChoose(index);
  }, []);
  const onGetIt = useCallback(() => {
    props.onGetIt();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.paymentMethod}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder={'Enter Discount Code'}
          />
          <Text style={styles.textApply} onPress={onApply}>
            APPLY
          </Text>
        </View>
        <Text style={styles.textChoose}>Choose your payment method</Text>
        <View style={styles.paymentMethodChoose}>
          <PaymentMethod
            styleImage={styles.visa}
            source={require('@assets/PurchaseDetail/visa.png')}
            onChoose={onChoose}
            index={0}
            isChoose={isChoose}
          />
          <PaymentMethod
            source={require('@assets/PurchaseDetail/master_card.png')}
            styleImage={styles.masterCard}
            onChoose={onChoose}
            index={1}
            isChoose={isChoose}
          />
          <PaymentMethod
            source={require('@assets/PurchaseDetail/amex.png')}
            styleImage={styles.amex}
            onChoose={onChoose}
            index={2}
            isChoose={isChoose}
          />
        </View>
        <View style={styles.buttonView}>
          <ButtonLinear
            title={'GET IT'}
            style={styles.bottomButton}
            onPress={onGetIt}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
});

export default PaymentOption;

const styles = StyleSheet.create({
  inputView: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 10,
  },
  paymentMethod: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
    backgroundColor: '#Fff',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },
  textApply: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#ED3269',
  },
  textChoose: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    lineHeight: 17,
    color: '#353B48',
    paddingTop: 32,
  },
  visa: {
    width: 64,
    height: 20,
  },
  masterCard: {
    width: 48.5,
    height: 30,
  },
  amex: {
    width: 70,
    height: 15,
  },
  paymentMethodChoose: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonView: {
    flex: 1,
    paddingTop: 56,
    width: '100%',
    paddingBottom: 16
  },
  bottomButton: {
    height: 50,
    borderRadius: 100,
  },
});
