import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SvgMail from 'svgs/ProfileSetting/SvgMail';
import SvgBack from 'svgs/ProfileSetting/SvgBack';
import SvgCity from 'svgs/ProfileSetting/SvgCity';
import SvgHashTag from 'svgs/ProfileSetting/SvgHashtag';
import SvgCredit from 'svgs/ProfileSetting/SvgCredit';
import SvgNotification from 'svgs/ProfileSetting/SvgNotification';
import SvgOnLocation from 'svgs/ProfileSetting/SvgOnLocation';
import SvgAboutUs from 'svgs/ProfileSetting/SvgAboutUs';
import SvgFeedBack from 'svgs/ProfileSetting/SvgFeedBack';
import SvgUpdate from 'svgs/ProfileSetting/SvgUpdate';
import Item from 'screens/Settings/components/Item';
import {width_screen} from 'ultis/dimensions';

const Settings = memo(() => {
  return (
    <View style={styles.container}>
      <Item
        svgItem={<SvgMail />}
        title={'Change Email'}
        txt={'lehieuds@gmail.com'}
        svgBack={<SvgBack />}
      />
      <Item
        svgItem={<SvgCity />}
        title={'Change City'}
        txt={'London'}
        svgBack={<SvgBack />}
      />
      <Item
        svgItem={<SvgHashTag />}
        title={'8 hashtag'}
        txt={'London'}
        svgBack={<SvgBack />}
      />
      <Item svgItem={<SvgCredit />} title={'Delete Payment History'} />
      <Item
        svgItem={<SvgNotification />}
        title={'Enable Notification'}
        switch={true}
      />
      <Item
        svgItem={<SvgOnLocation />}
        title={'Turn on Location'}
        switch={true}
      />
      <Text style={styles.txtAboutUs}>ABOUT US</Text>
      <Item svgItem={<SvgAboutUs />} title={'About us'} svgBack={<SvgBack />} />
      <Item
        svgItem={<SvgFeedBack />}
        title={'Send Feedback'}
        svgBack={<SvgBack />}
      />
      <Item svgItem={<SvgUpdate />} title={'Check For Update'} />
      <Text style={styles.txtVersion}>Evez version 2.0</Text>
    </View>
  );
});

export default Settings;
const styles = StyleSheet.create({
  txtAboutUs: {
    marginTop: '2%',
  },
  txtVersion: {
    fontSize: 14,
    color: '#7F8FA6',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginTop: '10%',
  },
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: '6%',
    marginTop: width_screen * 0.1,
  },
});
