import { Modal } from "@components";
import ChangeName from "@components/ChangeName/ChangeName";
import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ChangeNameProps } from "./models";
import { styles } from "./styles";

export const menuItem = (
  text: string,
  action?: () => void,
  type: string = "default"
) => {
  return (
    <>
      {type === "default" && (
        <TouchableOpacity style={styles.rowMenuRefresh} onPress={action}>
          <Text style={styles.textMenuRefresh}>{text}</Text>
        </TouchableOpacity>
      )}
      {type === "add" && (
        <TouchableOpacity
          style={[styles.rowMenuRefresh, { backgroundColor: "#3a86ff" }]}
          onPress={action}
        >
          <Text style={[styles.textMenuRefresh, { color: "white" }]}>
            {text}
          </Text>
        </TouchableOpacity>
      )}
      {type === "delete" && (
        <TouchableOpacity
          style={[styles.rowMenuRefresh, { backgroundColor: "#d90429" }]}
          onPress={action}
        >
          <Text style={[styles.textMenuRefresh, { color: "white" }]}>
            {text}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};
