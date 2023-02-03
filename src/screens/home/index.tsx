import { FlatList, globalLoading, Text } from "@components";
import React from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "react-native-element-image";
import { scale } from "react-native-size-scaling";
import { BANNER, DATA } from "./constant";
import { styles } from "./styles";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getAllReceipts, getAllUsers } from "./requests";

const { width } = Dimensions.get("window");

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const _renderItemSlider = ({ item, index }: any) => {
    return (
      <View key={index.toString()} style={styles.itemSlider}>
        <Image
          style={styles.imgSlider}
          width={width}
          height={150}
          source={item.img}
        />
      </View>
    );
  };

  const _renderItem = ({ item, index }: any) => {
    const goToDestination = async () => {
      if (index === 0) {
        navigate("Products");
      } else if (index === 1) {
        globalLoading.show();
        try {
          const users = await getAllUsers();
          globalLoading.hide();
          navigate("UsersList", { users: users });
        } catch (error) {
          Alert.alert("Vaya😥", "No ha sido posible obtener los datos.");
          globalLoading.hide();
          console.log(error);
        }
      } else if (index === 2) {
        globalLoading.show();
        try {
          const receipts = await getAllReceipts();
          globalLoading.hide();
          navigate("ReceiptsList", { receipts: receipts });
        } catch (error) {
          Alert.alert("Vaya😥", "No ha sido posible obtener los datos.");
          globalLoading.hide();
          console.log(error);
        }
      }
    };

    return (
      <TouchableOpacity onPress={goToDestination}>
        <View key={index.toString()} style={styles.item}>
          <Image
            style={styles.img}
            width={width / 2 - scale(24)}
            source={item.img}
            resizeMode="cover"
          />
          <Text style={styles.text} fontSize={14} bold>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FlatList
          data={BANNER}
          renderItem={_renderItemSlider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        <FlatList data={DATA} renderItem={_renderItem} numColumns={2} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
