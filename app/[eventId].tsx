import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import Reviews from "./components/Reviews";
import axios from "axios";
import Avis from "./avis"; 
import { getToken } from "./utils/storage";

export default function EventDetail() {
    const theme = useTheme();
    const { eventId } = useLocalSearchParams();
    const [event, setEvent] = useState<{ 
        lienImageEvenement: string; 
        titre: string; 
        description: string; 
        resumeHoraire: string; 
        lieu: { nomLieu: string }; 
        ageMinimum: number; 
        ageMaximum: number; 
        etat: string; 
        detailsCondition: string; 
    } | null>(null);
    const [eventReviews, setEventReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [token, setToken] = useState("");

    const handleAddReview = () => {
        setModalVisible(true);
    };

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getToken();
            setToken(token || "");
        };

        fetchToken();
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await axios.get(`https://app-80651435-7b96-4c7f-a772-4fcbfd695794.cleverapps.io/api/likes/evenement/${eventId}/status`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLikes(response.data.likeCount);
            setLiked(response.data.liked);
        } catch (err) {
            console.error("Failed to fetch likes", err);
        }
    };

    const handleLike = async () => {
        try {
            await axios.post(`https://app-80651435-7b96-4c7f-a772-4fcbfd695794.cleverapps.io/api/likes/evenement/${eventId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLiked(true);
            setLikes(likes + 1);
        } catch (err) {
            console.error("Failed to like the event", err);
        }
    };

    const fetchEventReviews = async () => {
        try {
            const reviewsResponse = await axios.get(`https://app-80651435-7b96-4c7f-a772-4fcbfd695794.cleverapps.io/api/comments/evenement/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEventReviews(reviewsResponse.data.content);
        } catch (err) {
            console.error("Failed to fetch reviews", err);
        }
    };

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventResponse = await axios.get(`https://app-80651435-7b96-4c7f-a772-4fcbfd695794.cleverapps.io/api/evenements/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEvent(eventResponse.data);
                await fetchEventReviews();
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Une erreur inconnue s'est produite");
                }
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchEventDetails();
            fetchLikes();
        }
    }, [eventId, token]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Event not found</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: event.lienImageEvenement }} style={styles.image} />
            <Text style={styles.title}>{event.titre}</Text>
            <Text style={styles.description}>{event.description}</Text>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <FontAwesome name="calendar" size={16} color={theme.colors.primary} />
                    <Text style={styles.dateTime}>{event.resumeHoraire}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="map-marker" size={16} color={theme.colors.primary} />
                    <Text style={styles.details}>Lieu: {event.lieu.nomLieu}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="user" size={16} color={theme.colors.primary} />
                    <Text style={styles.details}>Âge minimum: {event.ageMinimum}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="user" size={16} color={theme.colors.primary}/>
                    <Text style={styles.details}>Âge maximum: {event.ageMaximum}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="info-circle" size={16} color={theme.colors.primary} />
                    <Text style={styles.details}>État: {event.etat}</Text>
                </View>
                <View style={styles.infoRow}>
                    <FontAwesome name="exclamation-circle" size={16} color={theme.colors.primary} />
                    <Text style={styles.details}>Conditions: {event.detailsCondition}</Text>
                </View>
            </View>
            <Reviews reviews={eventReviews} onAddReview={() => setModalVisible(true)} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Avis onClose={() => {
                            setModalVisible(false);
                            fetchEventReviews();
                        }} eventId={eventId} />
                        <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.quitButton}>
                            Quitter
                        </Button>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    likeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16,
    },
    likeCount: {
        marginLeft: 8,
        fontSize: 16,
        color: "#333",
    },
    quitButton: {
        marginTop: 16,
    },
});