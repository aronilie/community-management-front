import { globalLoading, Modal } from "@components";
import { launchImageLibrary } from "react-native-image-picker";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from "react-native";
import { TextInput } from "react-native-element-textinput";
import { Product } from "@components/Product/models";
import { styles, inputStyles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createReceipt, markAvailable, updateDebts } from "./requests";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  visible: boolean;
  setIsVisible: (newVisible: boolean) => void;
  product: Product;
}

export type BuyProductProps = React.FC<Props>;

const BuyProduct: React.FC<Props> = (props) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { visible, setIsVisible, product } = props;

  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const options = {
    saveToPhotos: true,
    mediaType: "photo" as any,
    includeBase64: true,
    maxWidth: 700,
    maxHeight: 800,
    quality: 0.7 as any,
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "¿Permitir acceso a galeria?",
          message:
            "Es necesario conceder permisos " + "para seleccionar una imagen.",
          buttonNeutral: "Preguntármelo más tarde",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Gallery permission granted");
        openGallery();
      } else {
        console.log("Gallery permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    console.log(result);
    if (result.assets)
      if (result.assets[0].base64) setImage(result.assets[0].base64);
  };

  const buyProduct = async () => {
    globalLoading.show();
    try {
      const userId = await AsyncStorage.getItem("user");
      await createReceipt(userId, product.id, image, price);
      await updateDebts(userId, price);
      await markAvailable(product);
      globalLoading.hide();
      Alert.alert(
        "Felicidades!✅",
        "Se ha registrado tu compra correctamente."
      );
      navigate("Products");
    } catch (error) {
      console.log(error);
      globalLoading.hide();
      Alert.alert("Vaya😥", "No ha sido posible registrar la compra.");
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
          <Text style={styles.title}>{`Comprar ${product.name}`}</Text>
          <View style={inputStyles.container}>
            <TextInput
              value={price}
              style={inputStyles.input}
              keyboardType="numeric"
              inputStyle={inputStyles.inputStyle}
              labelStyle={inputStyles.labelStyle}
              placeholderStyle={inputStyles.placeholderStyle}
              textErrorStyle={inputStyles.textErrorStyle}
              placeholder="Precio"
              placeholderTextColor="gray"
              focusColor="blue"
              onChangeText={(text) => {
                setPrice(text);
              }}
            />
          </View>

          {image ? (
            <View style={{ flexDirection: "row" }}>
              <Text>Recibo cargado correctamente</Text>
              <TouchableOpacity onPress={() => setImage("")}>
                <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                  Editar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.rowMenuRefresh}
              onPress={requestGalleryPermission}
            >
              <Text style={styles.textMenuRefresh}>Cargar recibo</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.rowMenuAdd} onPress={buyProduct}>
            <Text style={styles.textMenuAdd}>Comprar producto</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default BuyProduct;
