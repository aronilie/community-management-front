import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from "react-native";
import { Receipt } from "./models";
import { background_profile3 } from "../../screens/setting/constant";
import { styles } from "./styles";
import { capitalizeFirstLetter } from "@shared/function";

const property = (receipt: Receipt, title: string, content: string) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
      <Text style={styles.propertyTitle}>{title}</Text>
      <Text style={styles.property}>{content}</Text>
    </View>
  );
};

type RootStackParamList = {
  Home: undefined;
  Receipt: Receipt;
  Feed: { sort: "latest" | "top" } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Receipt">;

const ReceiptComponent: React.FC<Props> = ({ route }: Props) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { receipt } = route.params;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ImageBackground
          style={styles.imgBackground}
          imageStyle={styles.imgBackground}
          source={background_profile3}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapProduct}>
            <Text style={styles.title}>Recibo</Text>
            {property(
              receipt,
              "Propietario:",
              capitalizeFirstLetter(receipt.owner.userName)
            )}
            {property(receipt, "Producto:", receipt.product.name)}
            {property(receipt, "Precio:", receipt.price)}
            {property(receipt, "Fecha:", receipt.date)}
            <Text style={[styles.propertyTitle, { marginBottom: 10 }]}>
              Comprobante:
            </Text>
            <Image
              style={{
                alignSelf: "center",
                height: 600,
                width: 380,
                marginBottom: 40,
              }}
              source={{ uri: `data:image/png;base64,${receipt.image}` }}
            />
            <View style={{ height: 100 }}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ReceiptComponent;
