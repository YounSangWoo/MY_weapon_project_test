import React from 'react';
import { View, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import styles from './styles';
import theme from '../Theme/theme';

export default function Header({ onPressLiveStreamNow, onPressLogout }) {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: theme.color.Black }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          backgroundColor: theme.color.Black,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity style={styles.liveStreamButton} onPress={() => onPressLiveStreamNow}>
          <Text style={styles.textButton}>방송 시작</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={() => onPressLogout}>
          <Text style={styles.textButton}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
