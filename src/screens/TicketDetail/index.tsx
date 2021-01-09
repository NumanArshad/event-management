import React, {createContext, memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TicketsDetailTab from 'nav/TicketsDetailTab';
import ButtonLinear from 'components/buttons/ButtonLinear';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {width_screen} from 'ultis/dimensions';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';

export const TotalContext = createContext({
  total: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTotal: (value: number) => {},
});

const TicketDetail = memo(() => {
  const [total, setTotal] = useState(0);

  const navigation = useNavigation();
  const onPurchase = useCallback(() => {
    navigation.navigate(ROUTES.PurchaseDetail);
  }, [navigation]);

  return (
    <TotalContext.Provider
      value={{
        total,
        setTotal,
      }}>
      <View style={styles.container}>
        <TicketsDetailTab />
        {total !== 0 ? (
          <ButtonLinear
            onPress={onPurchase}
            style={styles.btnPurchase}
            title={`PURCHASE -  $${total} `}
          />
        ) : null}
      </View>
    </TotalContext.Provider>
  );
});

export default TicketDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnPurchase: {
    position: 'absolute',
    bottom: getBottomSpace() + 8,
    width: 0.87 * width_screen,
    height: 50,
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 46,
  },
});
