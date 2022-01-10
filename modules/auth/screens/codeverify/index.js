import React, { useState } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import logo from "../../../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { textInputStyles } from "../styles";
import { verifyCode } from "../../actions";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button } from "../components";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';


const CELL_COUNT = 4;
const CodeVerify = ({ navigation }) => {

  const { api } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onButtonPress = async () => {
    if (value.length < 4)
      return

    dispatch(verifyCode({ token: value }))
      .then(unwrapResult)
      .then((res) => {
        if (res.status === 'OK') {
          navigation.navigate("SetPassword", { token: value })
        } else {
          Alert.alert(
            "Error!",
            "verification code is wrong."
          );
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
        <Text style={{ color: "#001523", fontWeight: "bold", fontSize: 24, marginVertical: 71 }}>Verification</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        <Text style={{ color: "#001523", fontSize: 14 }}>Enter the verification code we just sent on your email address.</Text>
      </View>
      <KeyboardAvoidingView style={{ width: '100%' }}>
        <View style={{ marginVertical: 20, marginBottom: 30 }}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                style={[styles.textContainer, isFocused && styles.focusCell]}>
                <Text
                  key={index}
                  style={[styles.cell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>

        <Button
          title="Submit"
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
    width: 100,
    height: 30
  }, textRow: {
    textAlign: "center",
    color: '#fff',
    fontSize: 22,
    fontFamily: "Roboto-Regular"
  },
  codeFieldRoot: {
    marginTop: 20
  },
  textContainer:{
    borderBottomWidth: 5,
    borderColor: '#000000',
  },
  cell: {
    width: 50,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000000',
  },
})

export default CodeVerify;
