import React, {useRef} from 'react';
import {
  Animated,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  items: string[];
  onIndexChange: (index: number) => void;
  itemHeight: number;
}

const WheelPicker: React.FC<Props> = props => {
  const {items, onIndexChange, itemHeight} = props;

  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({item, index}: ListRenderItemInfo<string>) => {
    const inputRange = [
      (index - 6) * itemHeight,
      (index - 5) * itemHeight,
      (index - 4) * itemHeight,
      (index - 3) * itemHeight,
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
    ];
    console.log(inputRange);
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.1, 0.35, 0.7, 1, 0.7, 0.35, 0.1],
    });

    return (
      <Animated.View style={[{height: itemHeight, transform: [{scale}]}]}>
        <Text style={styles.pickerItem}>{item}</Text>
      </Animated.View>
    );
  };

  const modifiedItems = ['', '', '', ...items, '', '', ''];

  const momentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    onIndexChange(index);
  };

  return (
    <View style={{height: itemHeight * 7}}>
      <Animated.FlatList
        data={modifiedItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={momentumScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
  },
});

export default WheelPicker;
