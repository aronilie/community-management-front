import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, globalLoading, Text } from "@components";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, View } from "react-native";
import { TextInput } from "react-native-element-textinput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  changeLanguageAction,
  selectMain,
  todoRequestAction,
} from "@reduxCore/main/slice";
import { styles } from "./styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IMG_BACKGROUND = require("@assets/images/pictures/background.jpg");

interface Props {}

const RegisterScrenn: React.FC<Props> = () => {
  const [isError, setIsError] = useState(false);

  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { locale } = useSelector(selectMain);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLanguageAction("vn"));
    dispatch(todoRequestAction());

    (async () => {
      try {
        const log = await AsyncStorage.getItem("user");
        if (log) if (log.length > 0) navigate("Main");
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      locale: locale,
    },
    validate: (values) => {
      const error: any = {};
      if (values.username.length === 0) {
        error.username = "Please enter username";
      }

      if (values.password.length === 0) {
        error.password = "Please enter password";
      }

      return error;
    },
    onSubmit: async (_values) => {
      try {
        globalLoading.show();
        const userReceived = await axios.post(
          "https://apartmanage.onrender.com/users/login",
          {
            userName: _values.username.toLowerCase(),
            passwd: _values.password,
          }
        );

        await AsyncStorage.setItem("user", userReceived.data.id);
        setIsError(false);
        navigate("Main");
        globalLoading.hide();
      } catch (error) {
        console.log(error);
        setIsError(true);
        globalLoading.hide();
        Alert.alert("Vaya!😥", "Parece que algo ha ido mal...");
      }
    },
  });

  return (
    <ImageBackground
      style={styles.container}
      source={IMG_BACKGROUND}
      resizeMode="cover"
    >
      <View style={styles.wrapBox}>
        <Text style={styles.title} bold fontSize={30}>
          Identifícate 🤨
        </Text>
        <TextInput
          style={styles.textinput}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          label="Username"
          placeholder="Placeholder"
          placeholderTextColor="gray"
          textError={formik.errors.username}
        />

        <TextInput
          style={styles.textinput}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          value={formik.values.password}
          textContentType="oneTimeCode"
          onChangeText={formik.handleChange("password")}
          label="Password"
          placeholder="Enter password"
          placeholderTextColor="gray"
          secureTextEntry
          textError={formik.errors.password}
        />
        {isError && <Text>¡Usuario o contraseña inválidos!</Text>}

        <Button
          style={styles.button}
          title="Entrar"
          fontSize={20}
          onPress={formik.handleSubmit}
        />
      </View>
    </ImageBackground>
  );
};

export default RegisterScrenn;
