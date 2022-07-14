import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Home";
import Basic from "../Screens/Basic";
import Switch from "../Screens/Switch";
import PenGestureHandle from "../Screens/PenGestureHandle";
import WheelPickerScreen from "../Screens/WheelPickerScreen";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Basic" component={Basic} />
      <Stack.Screen name="Switch" component={Switch} />
      <Stack.Screen name="PenGestureHandle" component={PenGestureHandle} />
      <Stack.Screen name="WheelPicker" component={WheelPickerScreen} />
    </Stack.Navigator>
  );
};
