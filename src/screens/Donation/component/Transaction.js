import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Modal,
  Alert,
  Animated,
} from "react-native";
import keyExtractor from "ultis/keyExtractor";
import TicketItem from "screens/ProfileTickets/components/TicketItem";
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { height_screen, width_screen } from "ultis/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import FONTS from "ultis/fonts";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTransactions,
  getCompanies,
  sendDonation,
} from "redux/donate/donate.actions";
import store from "../../../redux/store";

const Transaction = () => {
  const dispatch = useDispatch();
  const [credits, setcredits] = useState("");
  const [allTransactions, setallTransactions] = useState("");
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getAllTransactions().then((res) => {
      console.log("getAllTransactions", res.data);
      setallTransactions(res.data.data);
    });
  }, []);

  const onClickListener = () => {
    const data = {
      organization_id: organizationID,
      credits: credits,
    };
    //console.log("Send Donation", data);
    setModalVisible(false);
    setcredits("");
    dispatch(sendDonation(data, Alert));
  };
  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } },
        ])}
      >
        {Array.isArray(allTransactions) && allTransactions.length > 0 ? (
          allTransactions.map((data, id) => (
            <LinearGradient
              colors={["#ED3269", "#F05F3E"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.mainCard}
              key={id}
            >
              <View style={styles.earningDetails}>
                <Text style={styles.EventName}>
                  {"Sent By : "}
                  {data ? data.sender_name : "Sent By"}
                </Text>
                <Text style={styles.EventAttend}>
                  {"Receieved By : "}
                  {data ? data.receiver_name : "Receieved By"}
                </Text>
                <Text style={styles.EventAttend}>
                  {"Payment : "}
                  {data ? data.payment_type : "Payment Type"}
                </Text>
              </View>
              <View style={styles.earningCredits}>
                <Text style={styles.creditText}>Credits</Text>
                <Text style={styles.creditNumber}>
                  {data ? data.credits : "00"}
                </Text>
              </View>
            </LinearGradient>
          ))
        ) : (
          <Text
            style={{
              color: "#a4a4a4",
              textTransform: "uppercase",
              fontSize: 12,
              width: width_screen,
              textAlign: "center",
            }}
          >
            Loading....
          </Text>
        )}
      </ScrollView>
    </View>
  );
};
export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: height_screen * 0.01,
    marginHorizontal: width_screen * 0.01,
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
  modalView: {
    flexDirection: "row",
    height: height_screen * 0.25,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F05F3E",
    alignSelf: "center",
    top: height_screen * 0.4,
    borderRadius: 10,
    padding: 5,
  },
  textInput: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: "#fff",
    alignSelf: "center",
    height: 60,
    marginVertical: height_screen * 0.015,
    borderBottomWidth: 0.5,
    borderBottomColor: "#fff",
    width: "80%",
  },
  BtnModal: {
    color: "#fff",
    fontSize: 16,
    borderWidth: 0.5,
    paddingVertical: height_screen * 0.01,
    paddingHorizontal: width_screen * 0.05,
    borderColor: "#fff",
    borderRadius: 10,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
    marginBottom: height_screen * 0.02,
  },
  creditAsk: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },

  mainCard: {
    width: "100%",
    marginTop: height_screen * 0.01,
    flexDirection: "row",
    padding: "3%",
    borderRadius: 10,
  },
  earningDetails: {
    width: "70%",
    fontFamily: FONTS.Regular,
  },
  earningCredits: {
    width: "30%",
    fontFamily: FONTS.Regular,
  },
  EventName: {
    color: "#fff",
    fontFamily: FONTS.Regular,
  },
  EventAttend: {
    fontFamily: FONTS.Regular,
    color: "#fff",
  },
  creditText: {
    fontFamily: FONTS.Regular,
    textAlign: "center",
    color: "#fff",
  },
  creditNumber: {
    fontFamily: FONTS.Regular,
    textAlign: "center",
    color: "#fff",
  },
});
