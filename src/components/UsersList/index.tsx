import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "@components";
import React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-scaling";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "./stylesUsersList";
import { User } from "@components/User/models";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { capitalizeFirstLetter } from "@shared/function";

type RootStackParamList = {
  Home: undefined;
  Users: Array<User>;
  Feed: { sort: "latest" | "top" } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Users">;

const UsersList: React.FC<Props> = ({ route }: Props) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { users } = route.params;

  const itemMenu = (icon: string, userName: string, onPress: () => void) => {
    return (
      <TouchableOpacity style={styles.rowMenu} onPress={onPress}>
        <AntDesign name={icon} size={scale(22)} />
        <Text style={styles.textMenu} bold fontSize={16}>
          {userName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapMenu}>
          {users.length === 0 ? (
            <Text style={{ alignSelf: "center", marginTop: 40 }}>
              Aún no hay usuarios con ésta búsqueda.
            </Text>
          ) : (
            users.map((user: User, index: number) => {
              return (
                <View key={index}>
                  {itemMenu(
                    "user",
                    `${capitalizeFirstLetter(user.userName)}`,
                    () => {
                      navigate("User", { user: user });
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

export default UsersList;
