import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default Button = ({ context, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "90%",
        backgroundColor: "rgba(0,0,0,0.05)",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        borderRadius: 10,
        marginVertical: 5,
      }}
    >
      <Text>{context}</Text>
    </TouchableOpacity>
  );
};
