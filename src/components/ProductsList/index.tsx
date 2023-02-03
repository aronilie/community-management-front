import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { globalLoading, Modal, Text } from "@components";
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-scaling";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "./styles";
import { getAllProducts } from "@components/ProductsList/requests";

interface Props {}

const ProductsList: React.FC<Props> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const itemMenu = (
    icon: string,
    name: string,
    isWasted: boolean,
    onPress: () => void
  ) => {
    return (
      <TouchableOpacity style={styles.rowMenu} onPress={onPress}>
        <View style={{ flexDirection: "row" }}>
          <AntDesign name={icon} size={scale(22)} />
          <Text style={styles.textMenu} bold fontSize={16}>
            {name}
          </Text>
        </View>

        {isWasted && (
          <AntDesign
            name="exclamationcircle"
            size={scale(18)}
            color="#e63946"
          />
        )}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    globalLoading.show();
    (async () => {
      try {
        const obtainedProducts = await getAllProducts();
        setProducts(obtainedProducts);
        globalLoading.hide();
      } catch (error) {
        console.log(error);
        globalLoading.hide();
      }
    })();
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapMenu}>
          {products.length === 0
            ? null
            : products.map((product, index) => {
                return (
                  <View>
                    {itemMenu("tago", `${product.name}`, product.wasted, () => {
                      navigate("Product", { product: product });
                    })}
                  </View>
                );
              })}
          <TouchableOpacity
            style={styles.rowMenuAdd}
            onPress={() => navigate("AddProduct")}
          >
            <Text style={styles.textMenuAdd} bold fontSize={16}>
              Añadir producto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowMenuRefresh}
            onPress={() => setRefresh(!refresh)}
          >
            <Text style={styles.textMenuRefresh} bold fontSize={16}>
              Actualizar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={visible}
        transparent
        maxHeight={500}
        onRequestClose={() => setVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ProductsList;
