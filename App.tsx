/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { format, getHours, getMinutes, getSeconds } from 'date-fns';

const DEFAULT_CLOCK_RADIUS = Dimensions.get('window').width / 2 - 20;
const DEFAULT_NUMBERS_RADIUS = DEFAULT_CLOCK_RADIUS - 35;
const DEFAULT_CLOCK_SECONDS_HAND = DEFAULT_CLOCK_RADIUS - 40;
const DEFAULT_CLOCK_MINUTES_HAND = DEFAULT_CLOCK_RADIUS - 50;
const DEFAULT_CLOCK_HOURS_HAND = DEFAULT_CLOCK_RADIUS - 100;

const CLOCK_NUMBERS = Array.from({length: 12}, (_, i) => i + 1);

const ClockNumbers: FC<{ hour: number; radius?: number;}> = ({ hour, radius = DEFAULT_NUMBERS_RADIUS }) => {
  const deg = 30 * (hour - 3);
  const radian = Math.PI / 180 * deg;
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;

  return <Text
    style={{
      flex: 1,
      transform: [
        { translateX: x }, 
        { translateY: y }
      ],
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 24
    }}
    >
    {hour}
  </Text>
};

const ClockFrame: FC<{ time: Date; radius?: number; }> = ({ time, radius = DEFAULT_CLOCK_RADIUS }) => {

  const [hours, minutes, seconds] = useMemo(() => {
    return [getHours(time), getMinutes(time), getSeconds(time)];
  }, [time]);
  

  return <View
    style={{
      flex: 1,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    {/* 프레임 */}
    <View style={{
      width: radius * 2,
      height: radius * 2,
      borderColor: '#333',
      borderWidth: 14,
      borderRadius: 9999,
      position: 'absolute',
      backgroundColor: 'white',
    }} />
    {/* 초침 */}
    <View style={{
      width: DEFAULT_CLOCK_SECONDS_HAND,
      height: 3,
      position: 'absolute',
      backgroundColor: 'red',
      transform: [
        { rotate: `${seconds * 6 - 90}deg` },
        { translateX: DEFAULT_CLOCK_SECONDS_HAND / 2 },

      ],
    }} />
    {/* 시침 */}
    <View style={{
      width: DEFAULT_CLOCK_HOURS_HAND,
      height: 3,
      position: 'absolute',
      backgroundColor: '#333',
      transform: [
        { rotate: `${hours * 30 + minutes / 60 * 30 + seconds / 60 / 60 * 30 - 90}deg` },
        { translateX: DEFAULT_CLOCK_HOURS_HAND / 2 },
      ],
    }} />
    {/* 분침 */}
    <View style={{
      width: DEFAULT_CLOCK_MINUTES_HAND,
      height: 3,
      position: 'absolute',
      backgroundColor: '#333',
      transform: [
        { rotate: `${minutes * 6 + seconds / 60 * 6 - 90}deg` },
        { translateX: DEFAULT_CLOCK_MINUTES_HAND / 2},
        
      ],
    }} />
    {/* 고정판 */}
    <View style={{
      width: 10,
      height: 10,
      backgroundColor: '#333',
      borderRadius: 9999,
      position: 'absolute',
    }} />
    {CLOCK_NUMBERS.map((hour, i) => <ClockNumbers hour={hour} key={`clock-numbers-${i}`} />)}
  </View>;
};


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{
      flex: 1,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3452eb'
    }}>
      <ClockFrame time={time} />
    </View>
  );
};

export default App;
