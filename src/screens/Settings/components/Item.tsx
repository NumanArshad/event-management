import React, {memo, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FONTS from 'ultis/fonts';

interface Props {
  svgItem?: any;
  title: string;
  txt?: string;
  svgBack?: any;
  switch?: boolean;
}

const Item = memo((props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <TouchableOpacity style={styles.setting}>
      <View style={styles.svgItem}>{props.svgItem}</View>
      <View style={{flex: 1}}>
        <Text style={styles.txtTitle}>{props.title}</Text>
        {props.txt ? <Text style={styles.txt}>{props.txt}</Text> : null}
      </View>
      <View style={styles.witchAndBack}>
        {props.svgBack}
        {props.switch ? (
          <Switch
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#f4f3f4"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
});
export default Item;

const styles = StyleSheet.create({
  txtTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: '#353B48',
    fontFamily: FONTS.Medium,
  },
  txt: {
    fontSize: 14,
    color: '#7F8FA6',
    marginTop: '2%',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    height: (8.2 * Dimensions.get('window').height) / 100,
  },
  svgItem: {
    width: '10%',
    marginRight: '6%',
  },
  witchAndBack: {
    width: '20%',
    height: (7 * Dimensions.get('window').height) / 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
