import React, { useState } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native"
import logo from "../../../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { textInputStyles} from "../styles";
import { setPasswordRequest } from "../../actions";
import { unwrapResult } from "@reduxjs/toolkit";
import {  Button , TextInputField} from "../components";


const SetPassword = ({ navigation, route }) => {

  const [password, setPassword] = useState("");
  const [token, setToken] = useState(route.params.token);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState({
    password: "",
  });

  const { api } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const onButtonPress = async () => {

    if (!password)
      return setValidationError({
        password: "Please enter a valid password",
      });
    if (!confirmPassword)
      return setValidationError({
        password: "Please enter a valid password",
      });
    if (password !== confirmPassword)
      return setValidationError({
        password: "Confirm password and password do not match.",
      });
    dispatch(setPasswordRequest({ password, token }))
      .then(unwrapResult)
      .then((res) => {
        if (res.status === 'OK') {
          navigation.navigate("Login")
        }else{
          alert("Passowrd is too common.")
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
        <Text style={{ color: "#001523", fontWeight: "bold", fontSize: 24, marginVertical: 71 }}>Set new password</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <Text style={{ color: "#001523", fontSize: 14 }}>Your new password must be different from previous used passwords.</Text>
      </View>
      <KeyboardAvoidingView style={{ width: '100%' }}>
        <View style={{ marginVertical: 5 }}>

          <TextInputField
            label="Password"
            placeholder="New Password"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <TextInputField
            label="Password"
            placeholder="Confirm new Password"
            secureTextEntry={true}
            onChangeText={(value) => setConfirmPassword(value)}
            value={confirmPassword}
            error={validationError.password}
          />
        </View>

        <Button
          title="Reset password"
          loading={api.loading === "pending"}
          onPress={onButtonPress}
        />
        <View
          style={{
            marginBottom: 20,
            alignItems: 'center'
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

export default SetPassword;
