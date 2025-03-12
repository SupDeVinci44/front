import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import Reviews from "./components/Reviews";

const events = [
    { id: 1, title: "Conférence sur l'IA", description: "Une conférence sur les dernières avancées en intelligence artificielle.", date: "2023-11-01", time: "10:00", lieu: "Paris", age_minimum: 18, age_maximum: 60, etat: "Actif", details_condition: "Aucune", credit_image: "https://st5.depositphotos.com/23188010/77062/i/450/depositphotos_770624600-stock-photo-green-field-morning-render-illustration.jpg" },
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

const reviews = [
    { id: 1, eventId: 1, userId: 1, title: "Super conférence", comment: "J'ai beaucoup appris sur l'IA.", rating: 5 },
    { id: 2, eventId: 1, userId: 2, title: "Très intéressant", comment: "Les sujets abordés étaient pertinents.", rating: 4 },
];

export default function EventDetail() {
    const theme = useTheme();
    const { eventId } = useLocalSearchParams();
    const event = events.find(e => e.id === parseInt(eventId));
    const eventReviews = reviews.filter(review => review.eventId === parseInt(eventId));

    if (!event) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Event not found</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: event.credit_image }} style={styles.image} />
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.description}>{event.description}</Text>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <FontAwesome name="calendar" size={16} color={theme.colors.primary} />
                    <Text style={styles.dateTime}>{event.date} - {event.time}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="map-marker" size={16} color={theme.colors.primary} />
                    <Text style={styles.details}>Lieu: {event.lieu}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="user" size={16} color={theme.colors.primary} />
                    <Text style={styles.details}>Âge minimum: {event.age_minimum}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="user" size={16} color={theme.colors.primary}/>
                    <Text style={styles.details}>Âge maximum: {event.age_maximum}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="info-circle" size={16} color={theme.colors.primary} />
                    <Text style={styles.details}>État: {event.etat}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="exclamation-circle" size={16} color={theme.colors.primary} />
                    <Text style={styles.details}>Conditions: {event.details_condition}</Text>
                </View>
            </View>
            <Reviews reviews={eventReviews} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    description: {
        fontSize: 18,
        marginBottom: 16,
        color: "#666",
    },
    infoContainer: {
        width: "100%",
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    dateTime: {
        fontSize: 16,
        color: "#999",
        marginLeft: 8,
    },
    details: {
        fontSize: 16,
        color: "#333",
        marginLeft: 8,
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
    },
});