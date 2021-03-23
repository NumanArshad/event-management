import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { currentLat, currentLong } from 'ultis/functions';
import { useNavigation } from '@react-navigation/native';
import { markAttendance } from 'redux/attendEvent/attendEvent.actions';
import { useDispatch } from 'react-redux';
import ROUTES from 'ultis/routes';
import { alertMessage } from 'ultis/alertToastMessages';


export default function CustomBarCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log({ status })

      setHasPermission(status === 'granted');
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {

    // const {goBack} = navigation;
   // setScanned(true);
    //alertMessage( data )
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    const formData = new FormData();
    formData.append("event_id", data);
    formData.append("lat", currentLat);
    formData.append("long", currentLong);
    dispatch(markAttendance(formData, () => navigateWriteReview(data)))
  };

  const navigateWriteReview = eventId => {
    alertMessage("event id"+eventId)
    navigation.navigate(ROUTES.EventDetailRateComment, {
     eventId
    });
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{
      display: "flex",
      height: "90%",
      width: "100%",
      marginVertical: 20
    }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}