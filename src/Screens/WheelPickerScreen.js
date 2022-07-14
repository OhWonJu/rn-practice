import React, { useState } from "react";
import { Text, View } from "react-native";
import DatePicker from "react-native-date-picker";
import WheelPicker from "react-native-wheely";

import Container from "../components/Container";
// import WheelPicker from "../components/WheelPicker/WheelPicker";
import Button from "../components/Button";

const start = 1900;
const values = new Array(new Date().getFullYear() - start + 1)
  .fill(0)
  .map((_, i) => {
    const value = start + i;
    return { value, label: `${value}` };
  })
  .reverse();

export default WheelPickerScreen = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Container>
      <Text style={{ marginBottom: 24 }}>What year were you born?</Text>
      {/* <View style={{ flexDirection: "row" }}>
        <WheelPicker {...{ values, defaultValue }} />
        <WheelPicker {...{ values, defaultValue }} />
      </View> */}
      <Button context={"PRESS!"} onPress={() => setOpen(true)} />
      <DatePicker
        modal
        title={null}
        confirmText="확인"
        cancelText="취소"
        mode="time"
        locale="ko"
        // minuteInterval={60}
        is24hourSource={"locale"}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <WheelPicker
        selectedIndex={selectedIndex}
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        onChange={(index) => setSelectedIndex(index)}
        selectedIndicatorStyle={{
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "black",
          borderTopColor: "black",
          borderTopWidth: 1,
        }}
        containerStyle={{
          width: "50%",
          // height: 110,
        }}
        visibleRest={1}
        // itemStyle={{ top: -60 }}
        itemHeight={45}
        itemTextStyle={{ fontSize: 15 }}
      />
      <Text>{selectedIndex + 1}</Text>
    </Container>
  );
};

// https://github.com/henninghall/react-native-date-picker
// https://github.com/erksch/react-native-wheely
