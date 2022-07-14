import React from "react";
import { View } from "react-native";

export default Container = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      {children}
    </View>
  );
};
