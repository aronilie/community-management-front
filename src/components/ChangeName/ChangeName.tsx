import { globalLoading, Modal } from "@components";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-element-textinput";
import { Product } from "@components/Product/models";
import { changeProductName, changeUserPassword } from "./requests";
import { styles, inputStyles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  visible: boolean;
  setIsVisible: (newVisible: boolean) => void;
  title: string;
  product?: Product;
}

export type ChangeNameProps = React.FC<Props>;

const ChangeName: React.FC<Props> = (props) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const { visible, setIsVisible, product, title } = props;

  const [name, setName] = useState<string>("");

  const changeName = async () => {
    globalLoading.show();
    try {
      if (title === "Cambiar nombre") {
        await changeProductName(product as Product, name);
        navigate("Products");
      } else if (title === "Cambiar contraseña") {
        const userId = await AsyncStorage.getItem("user");
        await changeUserPassword(userId as string, name);
        navigate("Login");
      }
      Alert.alert("Bien👌", "Se ha producido el cambio correctamente.");
      globalLoading.hide();
    } catch (error) {
      Alert.alert("Vaya😥", "No ha sido posible hacer la modificación.");
      globalLoading.hide();
      console.log(error);
    }
  };

  return (
    <View>
      <Modal
        visible={visible}
        transparent
        maxHeight={500}
        onRequestClose={() => {
          setIsVisible(false);
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <View style={inputStyles.container}>
            <TextInput
              value={name}
              style={inputStyles.input}
              inputStyle={inputStyles.inputStyle}
              labelStyle={inputStyles.labelStyle}
              placeholderStyle={inputStyles.placeholderStyle}
              textErrorStyle={inputStyles.textErrorStyle}
              placeholder="Escribe aquí"
              placeholderTextColor="gray"
              focusColor="blue"
              onChangeText={(text) => {
                setName(text);
              }}
            />
          </View>
          <TouchableOpacity style={styles.rowMenuAdd} onPress={changeName}>
            <Text style={styles.textMenuAdd}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ChangeName;
