import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  ceil,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import Container from "../components/Container";

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

export default PenGestureHandle = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const PanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      // 마우스 이동 거리 만큼 translate를 보정
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <Container>
      <View
        style={{
          width: CIRCLE_RADIUS * 2,
          height: CIRCLE_RADIUS * 2,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: CIRCLE_RADIUS,
          borderWidth: 5,
          borderColor: "rgba(180, 255, 40, 1)",
        }}
      >
        <PanGestureHandler onGestureEvent={PanGestureEvent}>
          <Animated.View
            style={[
              {
                width: SIZE,
                height: SIZE,
                borderRadius: SIZE / 4,
                backgroundColor: "rgba(180, 255, 40, 0.8)",
              },
              rStyle,
            ]}
          />
        </PanGestureHandler>
      </View>
    </Container>
  );
};
