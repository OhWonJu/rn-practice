import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import Container from "../components/Container";

const SIZE = 100.0;

export default Switch = () => {
  const [btnWidth, setBtnWidth] = useState(0);

  const progress = useSharedValue(0);
  const translateX = useSharedValue(0);

  const PanGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      //   translateX.value = event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX < -100) {
        progress.value = withTiming(0);
      }
      if (event.translationX > 100) {
        progress.value = withTiming(1);
      }
    },
  });

  const handler = useCallback(() => {
    progress.value = withTiming(progress.value === 1 ? 0 : 1);
  });

  const color = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["#E1E1E1", "#7FA7D3"]
    );
    return {
      backgroundColor,
    };
  });
  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: interpolate(progress.value, [0, 1], [0, btnWidth]) },
        // { translateX: translateX.value },
      ],
    };
  }, []);

  return (
    <Container>
      <Animated.View
        style={[
          {
            width: "65%",
            padding: 10,
            borderRadius: 80,
          },
          color,
        ]}
        onLayout={(e) => {
          var { x, width } = e.nativeEvent.layout;
          setBtnWidth(width - x - SIZE / 2);
        }}
      >
        <TouchableOpacity onPress={() => handler()} activeOpacity={1}>
          <PanGestureHandler onGestureEvent={PanGestureEvent}>
            <Animated.View
              style={[
                {
                  height: SIZE,
                  width: SIZE,
                  backgroundColor: "#FBFBFB",
                  borderRadius: SIZE / 2,
                },
                circleAnimatedStyle,
              ]}
            />
          </PanGestureHandler>
        </TouchableOpacity>
      </Animated.View>
    </Container>
  );
};
