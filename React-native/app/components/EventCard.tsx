import React from "react";
import { Card, Title, Paragraph, Button, useTheme } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

export default function EventCard({ event }) {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{event.title}</Title>
        <Paragraph>{event.description}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Text style={{ color: theme.colors.primary }}>
          {event.date} - {event.time}
        </Text>
        <Button onPress={() => console.log(`Event ${event.id} pressed`)}>Voir Plus</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    width: '100%',
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
  },
});
