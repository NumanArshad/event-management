import React, {memo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {height_screen, width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';
import HeaderReward from 'screens/Rewards/components/HeaderReward';
import ButtonLinear from 'components/buttons/ButtonLinear';

const Rewards = memo(() => {
  const [value, onChangeText] = React.useState('');

  return (
    <View style={styles.container}>
      <HeaderReward amount={15} />
      <View style={styles.inputShape}>
        <TextInput
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder={'Enter your reward code...'}
        />
        <TouchableOpacity>
          <Text style={styles.txtApply}>APPLY</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.txtShare}>Share your discount code</Text>
      <ButtonLinear
        title={'AMN83K'}
        onPress={() => {}}
        style={styles.btnGetCode}
      />
      <Text style={styles.txtCopy}>Tap to copy and share</Text>
      <Text style={styles.txtWork}>How does it work?</Text>
      <Text style={styles.txtDescription}>{txtDescription}</Text>
    </View>
  );
});

export default Rewards;

const txtDescription =
  'Share your discount code with your friends!\n' +
  'You will get $1.00 for every new user who introduces your code in their profile.\n' +
  '\n' +
  '\n' +
  'They will get $4.00 to spend in Evez. When\n' +
  'they spend their first $ in Evez., without\n' +
  'discount coupons, you will get $4.00, up to a\n' +
  'maximum of $35.00.';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputShape: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    flexDirection: 'row',
    height: 0.06 * height_screen,
    borderRadius: 6,
    marginHorizontal: 0.065 * width_screen,
    marginTop: -0.03 * height_screen,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0.04 * width_screen,
  },
  txtApply: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#ED3269',
  },
  txtShare: {
    marginTop: 0.04 * height_screen,
    alignSelf: 'center',
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
  },
  btnGetCode: {
    height: 0.06 * height_screen,
    width: width_screen * 0.63,
    borderRadius: 100,
    marginTop: 0.02 * height_screen,
    marginBottom: 0.03 * height_screen,
    alignSelf: 'center',
  },
  txtCopy: {
    alignSelf: 'center',
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#7F8FA6',
  },
  txtWork: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#353B48',
    marginTop: 0.04 * height_screen,
    marginLeft: 0.065 * width_screen,
    marginBottom: 0.02 * height_screen,
  },
  txtDescription: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#7F8FA6',
    marginHorizontal: 0.065 * width_screen,
  },
});
