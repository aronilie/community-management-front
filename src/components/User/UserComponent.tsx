import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert,
} from "react-native";
import { User } from "./models";
import { background_profile4 } from "../../screens/setting/constant";
import { styles } from "./stylesUser";
import { globalLoading } from "@components/GlobalLoading";
import { getReceiptsByUser } from "./requests";
import { capitalizeFirstLetter } from "@shared/function";

const property = (user: User, title: string, content: string) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
      <Text style={styles.propertyTitle}>{title}</Text>
      <Text style={styles.property}>{content}</Text>
    </View>
  );
};

type RootStackParamList = {
  Home: undefined;
  User: User;
  Feed: { sort: "latest" | "top" } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "User">;

const UserComponent: React.FC<Props> = ({ route }: Props) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { user } = route.params;

  const loadReceipts = async () => {
    globalLoading.show();
    try {
      const receipts = await getReceiptsByUser(user);
      globalLoading.hide();
      navigate("ReceiptsList", { receipts: receipts });
    } catch (error) {
      Alert.alert("Vaya😥", "No ha sido posible obtener los datos.");
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
          source={background_profile4}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapProduct}>
            <View style={styles.productContainer}>
              <Text style={styles.productTitle}>
                {capitalizeFirstLetter(user.userName)}
              </Text>
              {property(user.debts, "Deuda:", user.debts)}
              <TouchableOpacity
                style={styles.rowMenuRefresh}
                onPress={loadReceipts}
              >
                <Text style={styles.textMenuRefresh}>Recibos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default UserComponent;
