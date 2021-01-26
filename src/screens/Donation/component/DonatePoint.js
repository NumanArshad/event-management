import React, { memo, useCallback, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import keyExtractor from "ultis/keyExtractor";
import TicketItem from "screens/ProfileTickets/components/TicketItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { height_screen, width_screen } from "ultis/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import FONTS from "ultis/fonts";
import { useSelector, useDispatch } from "react-redux";
import { getCompanies } from "redux/donate/donate.actions";
import store from "../../../redux/store";

const DonatePoint = () => {
  const dispatch = useDispatch();

  const { getState } = store;
  const { companies } = getState()?.donate;

  useEffect(() => {
    if (!companies) {
      dispatch(getCompanies());
    }
    console.log("Comapnies", companies);
  }, []);

  return (
    <View style={styles.container}>
      {companies.map((data, id) => (
        <View style={styles.CompanyView} key={id}>
          <Text style={styles.companyText}>{data?.name}</Text>
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
        </View>
      ))}
    </View>
  );
};
export default DonatePoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: height_screen * 0.01,
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
