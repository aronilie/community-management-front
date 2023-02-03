import { globalLoading } from "@components";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { TextInput } from "react-native-element-textinput";
import { background_profile } from "../../screens/setting/constant";
import { styles, inputStyles } from "./styles";
import { sendProduct } from "./requests";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface Props {}

const AddProduct: React.FC<Props> = (_props) => {
  const [name, setName] = useState<string>("");

  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const addProduct = async () => {
    globalLoading.show();
    try {
      await sendProduct(name);
      globalLoading.hide();
      Alert.alert("Felicidades!🎉", "Has añadido correctamente el producto.");
      navigate("Products");
    } catch (error) {
      console.log(error);
      globalLoading.hide();
      Alert.alert("Vaya😥", "No ha sido posible añadir el producto.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBackground}
          imageStyle={styles.imgBackground}
          source={background_profile}
        ></ImageBackground>
        <View style={styles.wrapMenu}>
          <View style={styles.menuContainer}>
            <Text style={styles.title}>Nombre:</Text>
            <View style={styles.container}>
              <TextInput
                value={name}
                style={inputStyles.input}
                inputStyle={inputStyles.inputStyle}
                labelStyle={inputStyles.labelStyle}
                placeholderStyle={inputStyles.placeholderStyle}
                textErrorStyle={inputStyles.textErrorStyle}
                placeholder="Toallitas de baño"
                placeholderTextColor="gray"
                focusColor="blue"
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.rowMenuAdd} onPress={addProduct}>
            <Text style={styles.textMenuAdd}>Añadir producto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddProduct;
