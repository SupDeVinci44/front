import React from "react";
import { Card, Title, Paragraph, Button, useTheme } from "react-native-paper";
import { StyleSheet, Text, Platform } from "react-native";
import { useRouter } from "expo-router";

export default function EventCard({ event }) {
  const theme = useTheme();
  const router = useRouter();
  console.log(event);
  console.log("event");

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: event.lienImageEvenement }} />
      <Card.Content>
        <Title numberOfLines={1} ellipsizeMode="tail">{event.titre}</Title>
        <Paragraph numberOfLines={2} ellipsizeMode="tail">{event.resume}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Text style={{ color: theme.colors.primary }}>
          {event.resumeHoraire}
        </Text>
        <Button onPress={() => router.push(`/${event.idEvenement}`)}>Voir Plus</Button>
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
