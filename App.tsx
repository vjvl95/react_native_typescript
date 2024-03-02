/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <View className="flex flex-1 items-center justify-center">
      <Text
        style={{
          includeFontPadding: false,
          paddingBottom: 0,
        }}
        className=" bg-black font-Bold text-white text-[16px]">
        폰트테스트
      </Text>
    </View>
  );
}

export default App;
