import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import EventCard from "./components/EventCard";

const events = [
  { id: 1, title: "Conférence sur l'IA", description: "Une conférence sur les dernières avancées en intelligence artificielle.", date: "2023-11-01", time: "10:00" },
  { id: 2, title: "Atelier de développement web", description: "Un atelier pratique pour apprendre les bases du développement web.", date: "2023-11-02", time: "14:00" },
  { id: 3, title: "Séminaire sur la cybersécurité", description: "Un séminaire pour comprendre les enjeux de la cybersécurité.", date: "2023-11-03", time: "09:00" },
  { id: 4, title: "Rencontre des développeurs", description: "Une rencontre pour échanger avec d'autres développeurs et partager des expériences.", date: "2023-11-04", time: "16:00" },
  { id: 5, title: "Hackathon", description: "Un hackathon de 48 heures pour développer des projets innovants.", date: "2023-11-05", time: "08:00" },
  { id: 6, title: "Formation en machine learning", description: "Une formation pour apprendre les bases du machine learning.", date: "2023-11-06", time: "11:00" },
  { id: 7, title: "Conférence sur le cloud computing", description: "Une conférence sur les technologies de cloud computing.", date: "2023-11-07", time: "13:00" },
  { id: 8, title: "Atelier de design UX/UI", description: "Un atelier pour apprendre les principes de design UX/UI.", date: "2023-11-08", time: "15:00" },
  { id: 9, title: "Séminaire sur la blockchain", description: "Un séminaire pour comprendre les technologies de la blockchain.", date: "2023-11-09", time: "10:00" },
  { id: 10, title: "Rencontre des startups", description: "Une rencontre pour échanger avec des startups et des entrepreneurs.", date: "2023-11-10", time: "14:00" },
  { id: 11, title: "Conférence sur les big data", description: "Une conférence sur les technologies et les applications des big data.", date: "2023-11-11", time: "09:00" },
  { id: 12, title: "Atelier de développement mobile", description: "Un atelier pour apprendre à développer des applications mobiles.", date: "2023-11-12", time: "16:00" },
  { id: 13, title: "Séminaire sur l'IoT", description: "Un séminaire pour comprendre les technologies de l'Internet des objets.", date: "2023-11-13", time: "08:00" },
  { id: 14, title: "Rencontre des ingénieurs logiciels", description: "Une rencontre pour échanger avec des ingénieurs logiciels et partager des expériences.", date: "2023-11-14", time: "11:00" },
  { id: 15, title: "Hackathon de réalité virtuelle", description: "Un hackathon de 48 heures pour développer des projets en réalité virtuelle.", date: "2023-11-15", time: "13:00" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un événement..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
  card: {
    marginBottom: 16,
    width: '100%',
  },
});