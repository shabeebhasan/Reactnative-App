import React, { useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import logo from "../../../../assets/logo.png";
import {  validateEmail } from "../constants.js";
import { useSelector, useDispatch } from "react-redux";
import { textInputStyles} from "../styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signupRequest } from "../../actions";
import { unwrapResult } from "@reduxjs/toolkit";
import DateTimePicker from '@react-native-community/datetimepicker';
import {  TextInputField,Button } from "../components";
import moment from "moment";

const Signup = ({ navigation }) => {

  const [showDate, setShowDate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("customer");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { api } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const onSignupPress = async () => {
    setValidationError({ email: "", password: "" });
    if (!validateEmail.test(email))
      return setValidationError({
        email: "Please enter a valid email address.",
        password: "",
      });

    if (!name)
      return setValidationError({
        email: "",
        name: "Please enter a valid name",
        dob: "",
        password: "",
        gender: ""
      });
    if (!password)
      return setValidationError({
        email: "",
        name: "",
        dob: "",
        password: "Please enter a valid password",
        gender: ""
      });
    if (password !== confirmPassword)
      return setValidationError({
        email: "",
        name: "",
        dob: "",
        password: "Confirm password and password do not match.",
        gender: ""
      });

    dispatch(signupRequest({ name, email, password, group }))
      .then(unwrapResult)
      .then(() => {
        Alert.alert(
          "Signup Success",
          "Registration Successful. A confirmation will be sent to your e-mail address."
        );
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image
        resizeMode="stretch"
        style={styles.image}
        source={logo}
      />
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Text style={{ color: "#001523", fontWeight: "bold", fontSize: 24, marginTop: 20, marginBottom: 20 }}>Sign up</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <Text style={{ color: "#001523", fontWeight: "bold", fontSize: 14 }}>Sign up as a</Text>
        <View style={{ flex: 1, width: '100%', flexDirection: 'row', marginStart: 10, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => {
            setGroup("customer")
          }} style={{ backgroundColor: group === 'customer' ? "#662d91" : "transparent", width: 113, height: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: "black" }}>
            <Text style={{color:group === 'customer' ? "#fff" : "#000" }}>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setGroup("seller")
          }} style={{ backgroundColor: group === 'seller' ? "#662d91" : "transparent", width: 113, height: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: "black" }}>
            <Text style={{color:group === 'seller' ? "#fff" : "#000" }}>Seller</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <View style={{ marginVertical: 5 }}>
          <TextInputField
            keyboardType="email-address"
            label="Email address"
            placeholder="Email address"
            onChangeText={(value) => setEmail(value)}
            value={email}
            error={validationError.email}
          />
          <TextInputField
            label="name"
            placeholder={"Full Name"}
            onChangeText={(value) => setName(value)}
            value={name}
            error={validationError.name}
          />
          <TextInputField
            label="Password"
            placeholder="Set Password"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
            error={validationError.password}
          />
          <TextInputField
            label="Password"
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(value) => setConfirmPassword(value)}
            value={confirmPassword}
          />

        </View>
        <Button
          title="Sign up"
          loading={api.loading === "pending"}
          onPress={onSignupPress}
        />
        {!!api.error && (
          <Text style={textInputStyles.error}>{api.error.message}</Text>
        )}

      </View>
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDate(false);
            setShowDobDOB(moment(new Date(selectedDate)).format("MM/DD/YYYY").toString());
            setDOB(moment(new Date(selectedDate)).format("YYYY-MM-DD").toString());

          }}
        />
      )}
      <View
        style={{
          marginVertical: 20,
          flex: 1,
          justifyContent: 'flex-end'
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>{"You already have an account?\t\t"}<Text style={{ fontWeight: 'bold' }}>Log in</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    alignItems: 'center',
    paddingVertical: 37,
    paddingHorizontal: 30
  },
  image: {
    width:100,
    height:30
  }, textRow: {
    textAlign: "center",
    color: '#fff',
    fontSize: 22,
    fontFamily: "Roboto-Regular"
  },
})

export default Signup;