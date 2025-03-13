import { Stack, useRouter } from "expo-router";
import { PaperProvider, Appbar, useTheme, DefaultTheme, MD3DarkTheme } from "react-native-paper";
import React from "react";
import { View, StyleSheet } from "react-native";

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

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? 'black' : 'white' }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="Eventura" titleStyle={{ color: "white" }} onPress={() => router.push('/home')} />
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
