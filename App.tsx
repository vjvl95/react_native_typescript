import React from 'react';
import {View} from 'react-native';
import Spongebob from './src/asset/spongbob2.svg';

function App(): React.JSX.Element {
  return (
    <View className="bg-white flex flex-1 items-center justify-center">
      <Spongebob width={1000} height={300} preserveAspectRatio="none" />
    </View>
  );
}

export default App;
