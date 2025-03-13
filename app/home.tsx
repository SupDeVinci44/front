import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, TextInput, View, Platform, Text, Button } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import EventCard from "./components/EventCard";
import { getToken } from "./utils/storage";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token || "");
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchAllEvents = async () => {
      if (!token) return;

      setLoading(true);
      setError("");
      try {
        const response = await fetch(`https://app-80651435-7b96-4c7f-a772-4fcbfd695794.cleverapps.io/api/evenements`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Network response was not ok');
        }
        setEvents(data.content);
      } catch (error) {
        setError("Une erreur s'est produite");
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, [token]);

  const fetchEvents = async (ville) => {
    if (!token) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://app-80651435-7b96-4c7f-a772-4fcbfd695794.cleverapps.io/api/evenements/ville/${ville}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }
      setEvents(data.content);
    } catch (error) {
      setError("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchEvents(searchQuery);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher par ville..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Rechercher" onPress={handleSearch} />
      </View>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.cardsContainer}>
          {events.map((event) => (
            <View key={event.idEvenement} style={styles.card}>
              <EventCard event={event} />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    flex: 1,
    marginRight: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: Platform.OS === 'web' ? '30%' : '100%',
    marginBottom: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});