import React, { memo, useCallback } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import keyExtractor from "ultis/keyExtractor";
import TicketItem from "screens/ProfileTickets/components/TicketItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { height_screen, width_screen } from "ultis/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import FONTS from "ultis/fonts";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";

const Donation = memo(() => {
  const navigation = useNavigation();
  const moveToDonate = useCallback(() => {
    navigation.navigate(ROUTES.DonatePoint);
  }, []);
  const onRewards = useCallback(() => {
    navigation.navigate(ROUTES.Rewards);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onRewards}>
        <LinearGradient
          colors={["#ED3269", "#F05F3E"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.btnStyle}
        >
          <Text style={styles.loginBtn}>Payout</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={moveToDonate}>
        <LinearGradient
          colors={["#ED3269", "#F05F3E"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.btnStyle}
        >
          <Text style={styles.loginBtn}>Donate Point</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity>
        <LinearGradient
          colors={["#ED3269", "#F05F3E"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.btnStyle}
        >
          <Text style={styles.loginBtn}>Transaction History</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* <View style={styles.CompanyView}>
        <Text style={styles.companyText}>Company Name</Text>
        <TouchableOpacity>
          <LinearGradient
            colors={["#ED3269", "#F05F3E"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnStyle2}
          >
            <Text style={styles.companyBtn}>Donate</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View> */}
    </View>
  );
});
export default Donation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: height_screen * 0.03,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  select: {
    width: width_screen * 0.95,
    backgroundColor: "red",
    alignSelf: "center",
    height: height_screen * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "transparent",
    borderRadius: 10,
    textAlign: "center",
    color: "#fff",
    fontSize: height_screen * 0.02,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  btnStyle: {
    borderRadius: 10,
    height: height_screen * 0.08,
    width: width_screen * 0.95,
    alignSelf: "center",
    marginTop: height_screen * 0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  CompanyView: {
    flexDirection: "row",
    borderColor: "#ED3269",
    borderWidth: 0.5,
    width: width_screen * 0.95,
    height: height_screen * 0.08,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "5%",
    padding: "1%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnStyle2: {
    borderRadius: 10,
    alignSelf: "center",
    // marginTop: height_screen * 0.01,
    justifyContent: "center",
    alignItems: "center",
    height: height_screen * 0.07,
    width: width_screen * 0.3,
  },
  companyBtn: {
    color: "#fff",
    fontSize: height_screen * 0.025,
  },
  companyText: {
    fontFamily: FONTS.Medium,
    color: "#000",
    fontSize: height_screen * 0.02,
    paddingLeft: width_screen * 0.05,
  },
});
