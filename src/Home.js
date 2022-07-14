import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

import Button from "./components/Button";
import Container from "./components/Container";

export default Home = ({ navigation }) => {
  return (
    <Container>
      <Button context={"Basic"} onPress={() => navigation.navigate("Basic")} />
      <Button
        context={"Switch"}
        onPress={() => navigation.navigate("Switch")}
      />
      <Button
        context={"PanGestureHandler"}
        onPress={() => navigation.navigate("PenGestureHandle")}
      />
      <Button
        context={"Wheel Picker"}
        onPress={() => navigation.navigate("WheelPicker")}
      />
    </Container>
  );
};
