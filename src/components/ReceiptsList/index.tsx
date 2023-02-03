import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "@components";
import React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-scaling";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "./styles";
import { Receipt } from "../Receipt/models";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Receipts: Array<Receipt>;
  Feed: { sort: "latest" | "top" } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Receipts">;

const ReceiptsList: React.FC<Props> = ({ route }: Props) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { receipts } = route.params;

  const itemMenu = (
    icon: string,
    productName: string,
    productDate: string,
    onPress: () => void
  ) => {
    return (
      <TouchableOpacity style={styles.rowMenu} onPress={onPress}>
        <AntDesign name={icon} size={scale(22)} />
        <Text style={styles.textMenu} bold fontSize={16}>
          {productName}
        </Text>
        <Text style={styles.textMenu} fontSize={16}>
          {productDate}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapMenu}>
          {receipts.length === 0 ? (
            <Text style={{ alignSelf: "center", marginTop: 40 }}>
              Aún no hay recibos con ésta búsqueda.
            </Text>
          ) : (
            receipts.map((receipt, index) => {
              return (
                <View>
                  {itemMenu(
                    "filetext1",
                    `${receipt.product.name}`,
                    `${receipt.date}`,
                    () => {
                      navigate("Receipt", { receipt: receipt });
                    }
                  )}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReceiptsList;
