import SubmitButton from "components/buttons/submitButton";
import React, { memo, useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { getBankInfo, updateBankInfo } from "redux/auth/auth.actions";
import ActivityItem from "screens/ProfileActivity/components/ActivityItem";
import { height_screen, width_screen } from "ultis/dimensions";
import isEmpty from "ultis/isEmpty";

const ProfileActivity = memo(() => {
  const [bankInfo, setBankInfo] = useState({});

  const {
    login_Session: { user_id },
    //@ts-ignore
  } = useSelector((state) => state?.auth);

  useEffect(() => {
    getBankInfo(user_id, setBankInfo);
  }, []);

  //console.log("bank infi is ", bankInfo);

  const handleSubmit = () => {
    const {
      billing_city: billingCity,
      billing_postcode,
      billing_state,
    } = bankInfo;

    updateBankInfo({ billingCity, billing_postcode, billing_state });
  };

  //@ts-ignore
  const {
    first_name,
    last_name,
    billing_address,
    billing_city,
    billing_state,
    billing_postcode,
    billing_country,
    credit_card_number,
    cvv,
    expiry_month,
    expiry_year,
  } = bankInfo || {};
  return (
    <View style={styles.container}>
      <Text>Username: {`${first_name} ${last_name}`}</Text>
      <Text>Country {billing_country}</Text>
      <Text>Card Number {credit_card_number}</Text>
      <Text>Billing Address {billing_address}</Text>
      <Text>Cvv: {cvv}</Text>
      <Text>Expiry Date: {`${expiry_month}/${expiry_year}`}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Billing City"
        value={billing_city}
        onChangeText={(text) =>
          setBankInfo({
            ...bankInfo,
            billing_city: text,
          })
        }
      />
      <TextInput
        style={styles.textInput}
        placeholder="Billing Post code"
        value={billing_postcode}
        onChangeText={(text) =>
          setBankInfo({
            ...bankInfo,
            billing_postcode: text,
          })
        }
      />
      <TextInput
        style={styles.textInput}
        placeholder="Billing State"
        value={billing_state}
        onChangeText={(text) =>
          setBankInfo({
            ...bankInfo,
            billing_state: text,
          })
        }
      />
      <SubmitButton text="Update" onPress={handleSubmit} />
    </View>
  );
});
export default ProfileActivity;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
   // justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
  },
  textInput: {
    height: height_screen * 0.07,
    width: width_screen * 0.8,
    borderWidth: 0.8,
    borderColor: "#F05F3E",
    borderRadius: 10,
    marginTop: height_screen * 0.01,
    paddingLeft: height_screen * 0.02,
  },
});

// const dataProfileActivity = [
//   {
//     typeActivity: TYPE_ACTIVITY.JOINED,
//     time_Do_Activity: "10 MINS AGO",
//     img: require("assets/ProfileActivity/BottledArt.png"),
//     titlePost: '"Bottled Art" Wine\n' + " Painting Night",
//     timePost: "SUN, MAR. 25  -  4:30 PM EST",
//   },
//   {
//     typeActivity: TYPE_ACTIVITY.BOUGHT,
//     time_Do_Activity: "MAR. 06, 2018",
//     img: require("assets/ProfileActivity/AMC.png"),
//     titlePost: "AMC Black Ticket",
//     timePost: "SUN, MAR. 28  -  4:30 PM EST",
//   },
//   {
//     typeActivity: TYPE_ACTIVITY.BOUGHT,
//     time_Do_Activity: "MAR. 03, 2018",
//     img: require("assets/ProfileActivity/WWE.png"),
//     titlePost: "Win 2 tickets to WWE @\n" + " MSG",
//     timePost: "SUN, MAR. 30  -  4:30 PM EST",
//   },
//   {
//     typeActivity: TYPE_ACTIVITY.JOINED,
//     time_Do_Activity: "FEB. 25, 2018",
//     img: require("assets/ProfileActivity/Wine.png"),
//     titlePost: '"Bottled Art" Wine\n' + " Painting Night",
//     timePost: "SUN, MAR. 28  -  4:30 PM EST",
//   },
//   {
//     typeActivity: TYPE_ACTIVITY.BOUGHT,
//     time_Do_Activity: "JAN. 20, 2018",
//     img: require("assets/ProfileActivity/MSG.png"),
//     titlePost: "Win 2 tickets to WWE @\n" + " MSG",
//     timePost: "SUN, MAR. 30  -  4:30 PM EST",
//   },
//   {
//     typeActivity: TYPE_ACTIVITY.JOINED,
//     time_Do_Activity: "10 MINS AGO",
//     img: require("assets/ProfileActivity/BottledArt.png"),
//     titlePost: '"Bottled Art" Wine\n' + " Painting Night",
//     timePost: "SUN, MAR. 25  -  4:30 PM EST",
//   },
//   {
//     typeActivity: TYPE_ACTIVITY.BOUGHT,
//     time_Do_Activity: "MAR. 06, 2018",
//     img: require("assets/ProfileActivity/AMC.png"),
//     titlePost: "AMC Black Ticket",
//     timePost: "SUN, MAR. 28  -  4:30 PM EST",
//   },
//   {
//     typeActivity: TYPE_ACTIVITY.BOUGHT,
//     time_Do_Activity: "MAR. 03, 2018",
//     img: require("assets/ProfileActivity/WWE.png"),
//     titlePost: "Win 2 tickets to WWE @\n" + " MSG",
//     timePost: "SUN, MAR. 30  -  4:30 PM EST",
//   },
//   {
//     typeActivity: TYPE_ACTIVITY.JOINED,
//     time_Do_Activity: "FEB. 25, 2018",
//     img: require("assets/ProfileActivity/Wine.png"),
//     titlePost: '"Bottled Art" Wine\n' + " Painting Night",
//     timePost: "SUN, MAR. 28  -  4:30 PM EST",
//   },
//   {
//     typeActivity: TYPE_ACTIVITY.BOUGHT,
//     time_Do_Activity: "JAN. 20, 2018",
//     img: require("assets/ProfileActivity/MSG.png"),
//     titlePost: "Win 2 tickets to WWE @\n" + " MSG",
//     timePost: "SUN, MAR. 30  -  4:30 PM EST",
//   },
// ];
