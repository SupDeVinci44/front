import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";

export default function Avis() {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddComment = () => {
    if (!title || !comment || rating === 0) {
      setError("Veuillez remplir tous les champs et donner une note.");
      return;
    }
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      console.log("Comment added successfully");
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Mauvais", "Moyen", "Bon", "Excellent"]}
        defaultRating={0}
        size={30}
        onFinishRating={setRating}
      />
      <TextInput
        label="Titre du commentaire"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { marginTop: 16 }]}
      />
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