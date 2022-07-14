import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Animated, {
  interpolateNode,
  Extrapolate,
  multiply,
  sub,
  divide,
  asin,
  cos,
} from "react-native-reanimated";
import { useValue, translateZ } from "react-native-redash/lib/module/v1";
import MaskedView from "@react-native-masked-view/masked-view";

import { ITEM_HEIGHT, VISIBLE_ITEMS } from "./constants";
import GestureHandler from "./GestureHandler";

const { width } = Dimensions.get("window");

const perspective = 600;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

export default WheelPicker = ({ values, defaultValue }) => {
  const translateY = useValue(0);

  const maskElement = (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {values.map((v, i) => {
        const y = interpolateNode(
          divide(sub(translateY, ITEM_HEIGHT * 2), -ITEM_HEIGHT),
          {
            inputRange: [i - RADIUS_REL, i, i + RADIUS_REL],
            outputRange: [-1, 0, 1],
            extrapolate: Extrapolate.CLAMP,
          }
        );
        const rotateX = asin(y);
        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);

        return (
          <Animated.View
            key={v.value}
            style={[
              styles.item,
              {
                transform: [
                  { perspective },
                  { rotateX },
                  translateZ(perspective, z),
                ],
              },
            ]}
          >
            <Text style={styles.label}>{v.label}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <MaskedView style={{ flex: 1, height: "100%" }} {...{ maskElement }}>
        <View style={{ backgroundColor: "grey", height: ITEM_HEIGHT * 2 }} />
        <View style={{ backgroundColor: "black", height: ITEM_HEIGHT }} />
        <View style={{ backgroundColor: "grey", height: ITEM_HEIGHT * 2 }} />
      </MaskedView>
      <GestureHandler
        max={values.length}
        value={translateY}
        {...{ defaultValue }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 0.61 * width,
    flex: 1,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
  label: {
    fontSize: 24,
    lineHeight: ITEM_HEIGHT,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
