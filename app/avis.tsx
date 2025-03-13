import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import axios from "axios";

export default function Avis({ onClose, eventId }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddComment = async () => {
    if (!comment) {
      setError("Veuillez remplir le champ commentaire.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `https://app-80651435-7b96-4c7f-a772-4fcbfd695794.cleverapps.io/api/comments/evenement/${eventId}`,
        {
          comment,
        },
        {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSb21hYWEiLCJpYXQiOjE3NDE4NzM0MDAsImV4cCI6MTc0MTk1OTgwMH0.o8FcOHx64eTViGa9-y-M6sqz3Kt9XN1rPMqHQXKnEXc',
          },
        }
      );
      console.log("Comment added successfully", response.data);
      onClose(); // Close the modal after adding the comment
    } catch (err) {
      setError("Une erreur s'est produite lors de l'ajout du commentaire.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Commentaire"
        value={comment}
        onChangeText={setComment}
        style={styles.input}
        multiline
        numberOfLines={4}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleAddComment} disabled={loading}>
        {loading ? <ActivityIndicator animating={true} color="white" /> : "Ajouter le commentaire"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
});