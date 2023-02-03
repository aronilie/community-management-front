import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Modal, Text } from "@components";
import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-size-scaling";
import AntDesign from "react-native-vector-icons/AntDesign";
import { background_profile2 } from "./constant";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangeName from "@components/ChangeName/ChangeName";

interface Props {}

const SettingScreen: React.FC<Props> = () => {
  const openInitialState = {
    passwd: false,
  };

  const [visible, setVisible] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(openInitialState);
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const itemMenu = (icon: string, name: string, onPress: () => void) => {
    return (
      <TouchableOpacity style={styles.rowMenu} onPress={onPress}>
        <AntDesign name={icon} size={scale(22)} />
        <Text style={styles.textMenu} bold fontSize={16}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  const changePassword = () => {
    setOpenModal({ ...openModal, passwd: true });
  };

  const logout = async () => {
    try {
      await AsyncStorage.setItem("user", "");
      navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgBackground}
        imageStyle={styles.imgBackground}
        source={background_profile2}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapMenu}>
          {itemMenu("setting", "Cambiar contraseña", changePassword)}
          {itemMenu("setting", "Cerrar sesión", logout)}
          <ChangeName
            visible={openModal.passwd}
            setIsVisible={(value) =>
              setOpenModal({ ...openModal, passwd: value })
            }
            title="Cambiar contraseña"
          />
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

export default SettingScreen;
