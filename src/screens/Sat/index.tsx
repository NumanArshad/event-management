import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FONTS from 'ultis/fonts';
import TicketItem from 'screens/Sun/components/TicketItem';
import keyExtractor from 'ultis/keyExtractor';

const Sat = memo(() => {
  const data = [
    {
      ticketType: 'Normal Ticket',
      showTime: '4:30 PM until 6:30 PM',
      ticketPrice: 80,
      soldOut: true,
    },
    {
      ticketType: 'Vip Ticket',
      showTime: '4:30 PM until 6:30 PM',
      ticketPrice: 80,
    },
    {
      ticketType: 'Normal Ticket',
      showTime: '4:30 PM until 6:30 PM',
      ticketPrice: 80,
    },
    {
      ticketType: 'Vip Ticket',
      showTime: '4:30 PM until 6:30 PM',
      ticketPrice: 80,
    },
  ];
  const renderItem = useCallback(({item}) => {
    const {ticketType, showTime, ticketPrice, soldOut} = item;
    return (
      <TicketItem
        ticketType={ticketType}
        showTime={showTime}
        ticketPrice={ticketPrice}
        soldOut={soldOut}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>WHAT TICKETS WOULD YOU LIKE?</Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
});
export default Sat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtTitle: {
    marginTop: 32,
    marginLeft: 24,
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#353B48',
  },
});
