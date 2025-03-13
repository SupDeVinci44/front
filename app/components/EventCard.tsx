import React from "react";
import { Card, Title, Paragraph, Button, useTheme } from "react-native-paper";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { useRouter } from "expo-router";

export default function EventCard({ event }) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: 'https://st5.depositphotos.com/23188010/77062/i/450/depositphotos_770624600-stock-photo-green-field-morning-render-illustration.jpg' }} />
      <Card.Content>
        <Title>{event.title}</Title>
        <Paragraph numberOfLines={2} ellipsizeMode="tail">{event.description}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Text style={{ color: theme.colors.primary }}>
          {event.date} - {event.time}
        </Text>
        <Button onPress={() => router.push(`/${event.id}`)}>Voir Plus</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    width: '100%',
    height: Platform.OS === 'web' ? 325 : 'auto',
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
  },
});
