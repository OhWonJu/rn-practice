import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNav from "./src/navigators/StackNav";

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
