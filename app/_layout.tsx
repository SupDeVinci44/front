import { Stack, useRouter, useFocusEffect } from "expo-router";
import { PaperProvider, Appbar, useTheme, DefaultTheme, MD3DarkTheme } from "react-native-paper";
import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { getToken, removeToken } from "./utils/storage";

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: 'black',
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <ThemedLayout />
    </PaperProvider>
  );
}

function ThemedLayout() {
  const theme = useTheme();
  const router = useRouter();
  const isDarkTheme = theme.dark;
  const [token, setToken] = useState("");

  const fetchToken = async () => {
    const token = await getToken();
    if (!token) {
      router.push('/');
    } else {
      setToken(token);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchToken();
    }, [])
  );

  const handleLogout = async () => {
    await removeToken();
    router.push('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? 'black' : 'white' }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="Eventura" titleStyle={{ color: "white" }} onPress={() => token && router.push('/home')} />
        {token && <Appbar.Action icon="logout" color="white" onPress={handleLogout} />}
      </Appbar.Header>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
