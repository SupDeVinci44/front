import { Stack, useRouter } from "expo-router";
import { PaperProvider, Appbar, useTheme } from "react-native-paper";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function RootLayout() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
          <Appbar.Content title="Eventura" titleStyle={{ color: "white" }} onPress={() => router.push('/home')} />
        </Appbar.Header>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
