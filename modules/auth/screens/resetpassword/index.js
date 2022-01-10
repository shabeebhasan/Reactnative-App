import React, { useState } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView, Text, TouchableOpacity} from "react-native"
import logo from "../../../../assets/logo.png";
import {  validateEmail } from "../constants.js";
import { useSelector, useDispatch } from "react-redux";
import { textInputStyles} from "../styles";
import { resetPassword } from "../../actions";
import { unwrapResult } from "@reduxjs/toolkit";
import {  TextInputField,Button } from "../components";


const ResetPassword = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
  });

  const { api } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const onButtonPress = async () => {
    if (!validateEmail.test(email))
      return setValidationError({
        email: "Please enter a valid email address.",
      });

    dispatch(resetPassword({ email: email }))
      .then(unwrapResult)
      .then((res) => {
        console.log(res);
        if(res.status === 'OK'){
          navigation.navigate("CodeVerify")
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={logo}
      />
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Text style={{ color: "#001523", fontWeight: "bold", fontSize: 24, marginVertical: 71 }}>Reset password</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <Text style={{ color: "#001523",  fontSize: 14 }}>Enter the email associated with your account and we will send an email with instructions to reset your password.</Text>
      </View>
      <KeyboardAvoidingView style={{ width: '100%' }}>
        <View style={{ marginVertical: 5 }}>
          <TextInputField
            keyboardType="email-address"
            label="Email address"
            placeholder="Email address"
            onChangeText={(value) => setEmail(value)}
            value={email}
            error={validationError.email}
          />
        </View>
        
        <Button
          title="Send instructions"
          loading={api.loading === "pending"}
          onPress={onButtonPress}
        />
        <View
          style={{
            marginBottom: 20,
            alignItems:'center'
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        {!!api.error && (
          <Text style={textInputStyles.error}>{api.error.message}</Text>
        )}

      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default ResetPassword;