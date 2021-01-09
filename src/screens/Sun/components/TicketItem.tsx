import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FONTS from 'ultis/fonts';
import SvgAdd from 'svgs/TicketDetail/SvgAdd';
import SvgSub from 'svgs/TicketDetail/SvgSub';
import {height_screen, width_screen} from 'ultis/dimensions';
import {TotalContext} from 'screens/TicketDetail';

interface Props {
  ticketType: string;
  showTime: string;
  ticketPrice: number;
  soldOut?: boolean;
}

const TicketItem = (props: Props) => {
  const [count, setCount] = useState(0);
  const {total, setTotal} = useContext(TotalContext);

  const add = useCallback(() => {
    setCount(count + 1);
    setTotal(total + props.ticketPrice);
  }, [count, total, props.ticketPrice, setTotal, setCount]);

  const sub = useCallback(() => {
    if (count === 0) {
      return;
    }
    setTotal(total - props.ticketPrice);
    setCount(count - 1);
  }, [count, total, props.ticketPrice, setTotal, setCount]);

  const txtColor =
    props.soldOut !== true ? {color: '#353B48'} : {color: '#7F8FA6'};
  const backGroundColor =
    count > 0 ? {backgroundColor: '#ED3269'} : {backgroundColor: '#F7F8FA'};
  const numberTicketColor = count > 0 ? {color: '#FFF'} : {color: '#7F8FA6'};
  const totalPrice = props.ticketPrice * count;

  return (
    <View style={styles.ticketItem}>
      <View style={[styles.numberTicket, backGroundColor]}>
        <Text style={[styles.txtNumberTicket, numberTicketColor]}>{count}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.txtTicketType, txtColor]}>{props.ticketType}</Text>
        <Text style={[styles.txtShowTime, txtColor]}>{props.showTime}</Text>
        {props.soldOut !== true ? (
          <Text style={styles.txtTicketPrice}>
            x ${props.ticketPrice} = ${totalPrice}
          </Text>
        ) : (
          <Text style={styles.txtTicketPrice}>Sold out</Text>
        )}
      </View>
      {props.soldOut !== true ? (
        <View style={styles.btn}>
          <TouchableOpacity onPress={add} style={styles.svgAdd}>
            <SvgAdd />
          </TouchableOpacity>
          <TouchableOpacity onPress={sub} style={styles.svgSub}>
            <SvgSub />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default TicketItem;
const styles = StyleSheet.create({
  ticketItem: {
    flexDirection: 'row',
    marginHorizontal: 24,
    alignItems: 'center',
    height: 0.13 * height_screen,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 5)',
    shadowOffset: {width: 5, height: 10},
    marginTop: 17,
    overflow: 'hidden',
  },
  txtNumberTicket: {
    fontFamily: FONTS.Medium,
    fontSize: 40,
  },
  content: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 0.05 * width_screen,
  },
  txtTicketType: {
    fontFamily: FONTS.Medium,
    fontSize: 16,
  },
  txtShowTime: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    marginVertical: 0.01 * height_screen,
  },
  txtTicketPrice: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#ED3269',
  },
  numberTicket: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '17%',
    height: '100%',
  },
  svgAdd: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  },
  svgSub: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderLeftWidth: 1,
    borderColor: '#F1F1F1',
  },
});
