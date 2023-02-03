import { globalLoading, Modal } from "@components";
import BuyProduct from "@components/BuyProduct/BuyProduct";
import ChangeName from "@components/ChangeName/ChangeName";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from "react-native";
import { Product } from "./models";
import { background_profile } from "../../screens/setting/constant";
import { menuItem } from "./components";
import { deleteProduct, markWasted, getReceiptsByProduct } from "./requests";
import { styles } from "./styles";

type RootStackParamList = {
  Home: undefined;
  Product: { product: Product };
  Feed: { sort: "latest" | "top" } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

const ProductComponent: React.FC<Props> = ({ route }: Props) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const { product } = route.params;

  const openInitialState = {
    name: false,
    buy: false,
  };

  const [open, setOpen] = useState(openInitialState);

  const makeWasted = async () => {
    globalLoading.show();
    try {
      await markWasted(product);
      Alert.alert("Bueno...🙄", "Ahora toca comprar el producto!");
      globalLoading.hide();
      navigate("Products");
    } catch (error) {
      Alert.alert("Vaya😥", "No ha sido posible modificar el producto.");
      globalLoading.hide();
      console.log(error);
    }
  };

  const changeName = () => {
    setOpen({ ...open, name: true });
  };

  const viewReceipts = async () => {
    globalLoading.show();
    try {
      const receipts = await getReceiptsByProduct(product);
      globalLoading.hide();
      navigate("ReceiptsList", { receipts: receipts });
    } catch (error) {
      Alert.alert("Vaya😥", "No ha sido posible obtener los datos.");
      globalLoading.hide();
      console.log(error);
    }
  };

  const buyProd = async () => {
    setOpen({ ...open, buy: true });
  };

  const deleteProd = async () => {
    globalLoading.show();
    try {
      await deleteProduct(product);
      Alert.alert(
        "Producto eliminado✅",
        "Mejor! Vamos reduciendo el consumo."
      );
      globalLoading.hide();
      navigate("Products");
    } catch (error) {
      Alert.alert("Vaya😥", "No ha sido posible modificar el producto.");
      globalLoading.hide();
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ImageBackground
          style={styles.imgBackground}
          imageStyle={styles.imgBackground}
          source={background_profile}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapProduct}>
            {product && (
              <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{product.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Estado: </Text>
                  {product.wasted ? (
                    <Text style={styles.productWastedText}>Agotado</Text>
                  ) : (
                    <Text style={styles.productNonWastedText}>Disponible</Text>
                  )}
                </View>

                {!product.wasted && (
                  <>{menuItem("Marcar como gastado", makeWasted)}</>
                )}
                {menuItem("Cambiar nombre", changeName)}
                <ChangeName
                  visible={open.name}
                  setIsVisible={(value) => setOpen({ ...open, name: value })}
                  title="Cambiar nombre"
                  product={product}
                />
                {menuItem("Ver recibos", viewReceipts)}
                {product.wasted && <>{menuItem("Comprar", buyProd, "add")}</>}
                <BuyProduct
                  visible={open.buy}
                  setIsVisible={(value) => setOpen({ ...open, buy: value })}
                  product={product}
                />
                {menuItem("Eliminar", deleteProd, "delete")}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProductComponent;
