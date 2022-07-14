import React, { useCallback, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import _ from "underscore";

import Container from "../components/Container";

const SIZE = 100.0;

const handleRotation = (progress) => {
  // 애니메이션 관련해서 별도의 JS 함수를 사용하고자하면
  // worklet을 함수내에 선언해준다.
  // reanimate 관련 함수들??은 기존 JS 스레드와 별도로 동작하기 때문에?
  "worklet";
  return `${interpolate(progress.value, [1, 2], [0.5, 1]) * 2 * Math.PI}rad`;
};

export default Basic = () => {
  const progress = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [1, 2], [0.5, 1]),
      borderRadius: (interpolate(progress.value, [1, 2], [1, 0.5]) * SIZE) / 2,
      transform: [
        { scale: progress.value },
        {
          rotateY: handleRotation(progress),
        },
      ],
    };
  }, []);

  const scale = useSharedValue(1);
  const rotate = useSharedValue(1);
  const reanimatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [1, 2], [0.5, 1]),
      borderRadius: SIZE / 2,
      transform: [
        { scale: scale.value },
        {
          rotateY: `${rotate.value * 2 * Math.PI}rad`,
        },
      ],
    };
  }, []);

  const handler = useCallback(
    _.throttle(() => {
      progress.value = withSpring(progress.value === 1 ? 2 : 1);
      scale.value = withRepeat(withTiming(2, { duration: 500 }), 2, true);
      rotate.value = withRepeat(withTiming(2, { duration: 500 }), 2, true);
    }, 1500),
    []
  );

  return (
    <Container>
      <TouchableOpacity onPress={() => handler()}>
        <Animated.View
          style={[
            { height: SIZE, width: SIZE, backgroundColor: "blue" },
            reanimatedStyle2,
          ]}
        />
      </TouchableOpacity>
    </Container>
  );
};
